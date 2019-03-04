import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';

import { funcHandleYear, funcHandleMonth } from '../../../utils/funcs';

import CalendarContent from './CalendarContent';
import CalendarSidebarItem from './CalendarSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';
import SidebarContext from '../../_common/contexts/SidebarContext';

import { ADD_NEW_GROUP } from '../../../graphql/mutations';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const CalendarSidebar = (props) => {
	const { staticContext, groups, client } = props;
	const req = __isNode__ && staticContext ? staticContext.req : undefined;

	const urlParams = !__isNode__ ? new URLSearchParams(window.location.search) : { get: () => undefined };

	const getParam = (paramKey) => (__isNode__ && req ? req.query[paramKey] : urlParams.get(paramKey));

	const [ year, setYear ] = useState(getParam('year') || new Date().getFullYear());
	const [ month, setMonth ] = useState(getParam('month') || new Date().getMonth());

	useEffect(() => {
		setYear(getParam('year') || new Date().getFullYear());
		setMonth(getParam('month') || new Date().getMonth());
	}, []);

	const handleNavigation = (bool) => {
		setYear(funcHandleYear(year, month, bool));
		setMonth(funcHandleMonth(month, bool));
	};

	const navigateToNow = () => {
		setYear(new Date().getFullYear());
		setMonth(new Date().getMonth());
	};

	// Handeler for adding new group
	const onGroupSubmit = (title) => {
		// ADD_NEW_GROUP
		client
			.mutate({
				mutation: ADD_NEW_GROUP,
				variables: { title },
				refetchQueries: [ 'readAllGroups' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				scrollToBottom('.TodoSidebar-The-List-01');
			});
	};

	return (
		<SidebarContext.Consumer>
			{(context) => (
				<div className={`TodoSidebar-c-00 ${context.sidebar && 'TodoSidebar-c-00-Hidden'}`}>
					<CalendarContent miniCalendarState={{ year, month }} miniCalendar={true} />
					<p>**</p>

					<div className="TodoSidebar-The-List-01">
						{groups.map((group, i) => {
							// return <CalendarSidebarItem key={i} index={i} group={group} />;
							return <p key={i}>{group.title}</p>;
						})}
					</div>
					<ItemSubmitForm placeholder="+ New Group" onSubmit={onGroupSubmit} />
				</div>
			)}
		</SidebarContext.Consumer>
	);
};

export default (props) => <ApolloConsumer>{(client) => <CalendarSidebar {...props} client={client} />}</ApolloConsumer>;
