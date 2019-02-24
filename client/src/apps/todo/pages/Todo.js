import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
// import ReactSVG from 'react-svg';
import { Redirect } from 'react-router-dom';

import { handleAppMode } from '../../actions/app_mode_actions';
import TodoSidebarComp from '../partials/todo/todo_sidebar';
import TodoListComp from '../partials/todo/todo_list';
import EventDetailsComp from '../reusables/event_details/event_details';

// Checking if Environment is Node.js or Browser
let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const TodoPage = (props) => {
	// Getting 'req' from staticContext
	const { staticRouter, groups, events } = props;
	const req = staticContext ? staticContext.req : undefined;

	// To Find Query Str in the client
	const urlParams = new URLSearchParams(window.location.search);

	// Returns Page Initial Group-Id
	const initGroupId = (req, groups) => {
		const hasGroups = groups && groups.length > 0;
		if (__isNode__ && req) {
			return req.query.group || hasGroups ? groups[0]._id.toString() : '';
		} else {
			return urlParams.get('group') || hasGroups ? groups[0]._id.toString() : '';
		}
	};

	// Returns Page Initial Event-Id
	const initEventId = (req) => {
		if (__isNode__ && req) {
			return req.query.event || '';
		} else {
			return urlParams.get('event') || '';
		}
	};

	// Component States
	const [ groupId, setGroupId ] = useState(initGroupId(req, groups));
	const [ eventId, setEventId ] = useState(initEventId(req));

	// Lifecycle
	useEffect(() => {
		if (!__isNode__) {
			setGroupId(urlParams.get('group') || '');
			setEventId(urlParams.get('event') || '');

			if (!urlParams.get('group') && props.groups[0]) {
				setGroupId(props.groups[0]._id);
			}
		}

		return () => {};
	}, []);

	const changeGroupId = (id) => {
		setGroupId(id);
		setEventId('');
		const history = createBrowserHistory();
		history.push(`/todo?group=${id}`);
	};

	const changeEventId = (id) => {
		// setGroupId('');
		setEventId(id);
		const history = createBrowserHistory();
		history.push(`/todo?group=${groupId}&event=${id}`);
	};

	const activeGroup = props.groups.find(({ _id }) => _id === groupId);
	const activeEvent = props.events.find(({ _id }) => _id === eventId);

	return (
		<div className="todo-page-000">
			{props.auth ? (
				<React.Fragment>
					<TodoSidebarComp changeGroupId={changeGroupId} active_groupId={groupId} visible={props.sideBar} />
					<div className="todo-page-001-content">
						{!groupId ? (
							// <h2><ReactSVG src='/logo.svg'/>Loading...</h2>
							<h2>Loading...</h2>
						) : (
							<TodoListComp
								active_groupId={groupId}
								activeGroup={activeGroup}
								changeEventId={changeEventId}
							/>
						)}
					</div>
					{activeEvent && (
						<EventDetailsComp
							event={activeEvent}
							hex_color={activeGroup.hex_color}
							closeEventDetails={() => {
								setEventId('');
								const history = createBrowserHistory();
								history.push(`/todo?group=${groupId}`);
							}}
						/>
					)}
				</React.Fragment>
			) : (
				<Redirect to="/login" />
			)}
		</div>
	);
};

// const loadData = () => {

// }

const mapStateToProps = ({ auth, groups, events, sideBar }) => ({ auth, groups, events, sideBar });

const mapDispatchToProps = (dispatch) => ({
	handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
	component: connect(mapStateToProps, mapDispatchToProps)(TodoPage),
	loadData: function(store) {
		// return store.dispatch(handleAppMode(1));
	}
};
