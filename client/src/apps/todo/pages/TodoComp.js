import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

import TodoSidebar from '../components/TodoSidebar';
import EventList from '../components/EventList';
import EventDetails from '../../_common/components/EventDetails';

import SettingsContext from '../../_common/contexts/SettingsContext';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const TodoComp = (props) => {
	// Getting 'req' from staticContext
	const { staticContext, groups } = props;
	const req = __isNode__ && staticContext ? staticContext.req : undefined;

	// To Find Query Str in the client
	const urlParams = !__isNode__ ? new URLSearchParams(window.location.search) : { get: () => undefined };

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

	// Handleing Active Group
	// useEffect(
	// 	() => {
	// 		setActiveGroup(groups.find(({ _id }) => _id === groupId) || groups[0]);
	// 		return () => {};
	// 	},
	// 	[ groupId ]
	// );

	const activeGroup = groups.find(({ _id }) => _id === groupId) || groups[0];
	const activeEvent = activeGroup && eventId ? activeGroup._events.find(({ _id }) => _id === eventId) : undefined;

	// Changing Route and State
	const changeGroupId = (id) => {
		setGroupId(id);
		setEventId('');
		const history = createBrowserHistory();
		history.push(`/todo?group=${id}`);
	};

	// Changing Route and State
	const changeEventId = (id) => {
		// setGroupId('');
		setEventId(id);
		const history = createBrowserHistory();
		history.push(`/todo?group=${groupId}&event=${id}`);
	};

	return (
		<SettingsContext.Consumer>
			{({ settings, setSettings }) => (
				<div className="TodoComp-c-00">
					<TodoSidebar groups={groups} activeGroupId={groupId} changeGroupId={changeGroupId} />

					{activeGroup && (
						<EventList
							events={activeGroup._events}
							activeGroup={activeGroup}
							changeEventId={(id) => {
								setSettings(null);
								changeEventId(id);
							}}
						/>
					)}
					{settings ? (
						<div />
					) : activeEvent ? (
						<EventDetails
							event={activeEvent}
							groups={groups}
							pathName="todo"
							hex_color={activeGroup.hex_color}
							closeEventDetails={() => changeGroupId(groupId)}
						/>
					) : (
						<React.Fragment />
					)}
				</div>
			)}
		</SettingsContext.Consumer>
	);
};

export default TodoComp;
