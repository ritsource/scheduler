import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';

import { funcHandleYear, funcHandleMonth } from '../../../utils/funcs';

import CalendarContent from './CalendarContent';
import CalendarSidebarItem from './CalendarSidebarItem';
import CalendarSidebarNavigator from './CalendarSidebarNavigator';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import SidebarContext from '../../_common/contexts/SidebarContext';
import NotifyQueueContext from '../../_common/contexts/NotifyQueueContext';

import {
	ADD_NEW_GROUP,
	EDIT_GROUP_BY_ID,
	EDIT_GROUP_TO_INVISIBLE,
	EDIT_GROUP_TO_VISIBLE,
	DELETE_GROUP
} from '../../../graphql/mutations';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const CalendarSidebar = (props) => {
	const { staticContext, groups, handleUrlNavigation, handleMainCalendarNavigation, client, notify } = props;
	const req = __isNode__ && staticContext ? staticContext.req : undefined;

	const urlParams = !__isNode__ ? new URLSearchParams(window.location.search) : { get: () => undefined };

	const getParam = (paramKey) => parseInt(__isNode__ && req ? req.query[paramKey] : urlParams.get(paramKey));

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

	const handleGroupRename = async ({ groupId, title, hex_color }) => {
		if (title.length > 0) {
			await client.mutate({
				mutation: EDIT_GROUP_BY_ID,
				variables: { groupId, title, hex_color },
				refetchQueries: [ 'readGroupsOnCalendar' ],
				awaitRefetchQueries: true
			});
			document.querySelector(`#CalendarSidebarItem-Input-xx-${groupId}`).blur();
		}
	};

	const handleGroupDelete = async (groupId) => {
		await client.mutate({
			mutation: DELETE_GROUP,
			variables: { groupId },
			refetchQueries: [ 'readGroupsOnCalendar' ]
		});
	};

	// Handeler for adding new group
	const onGroupSubmit = (title) => {
		// ADD_NEW_GROUP
		client
			.mutate({
				mutation: ADD_NEW_GROUP,
				variables: { title },
				refetchQueries: [ 'readGroupsOnCalendar' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				scrollToBottom('.Sidebar-The-List-01');
			});
	};

	const handleGroupVisiblity = async (groupId, bool) => {
		if (bool) notify.addToQueue('Fetching...');
		try {
			await client.mutate({
				mutation: bool ? EDIT_GROUP_TO_VISIBLE : EDIT_GROUP_TO_INVISIBLE,
				variables: { groupId },
				refetchQueries: [ 'readGroupsOnCalendar' ],
				awaitRefetchQueries: true
			});
			notify.removeFromQueue('Fetching...');
		} catch (error) {
			notify.removeFromQueue('Fetching...');
			notify.addToQueue('Failed!');
		}
	};

	return (
		<SidebarContext.Consumer>
			{(context) => (
				<div className={`Sidebar-c-00 ${context.sidebar && 'Sidebar-c-00-Hidden'}`}>
					<CalendarSidebarNavigator month={month} year={year} handleNavigation={handleNavigation} />
					<CalendarContent
						miniCalendarState={{ year, month }}
						miniCalendar={true}
						// handleMainCalendarNavigation={handleMainCalendarNavigation}
						handleUrlNavigation={handleUrlNavigation}
					/>

					<p
						style={{
							margin: '15px 29px 10px 29px',
							color: 'var(--theme-color)',
							fontSize: '18px',
							fontWeight: 'bold'
						}}
						onClick={() => console.log(groups[1]._events)}
					>
						Groups
					</p>

					<div className="Sidebar-The-List-01">
						{groups.map((group, i) => {
							return (
								<CalendarSidebarItem
									key={i}
									index={i}
									group={group}
									handleGroupRename={handleGroupRename}
									handleGroupDelete={handleGroupDelete}
									handleGroupVisiblity={handleGroupVisiblity}
								/>
							);
							// return <p key={i}>{group.title}</p>;
						})}
					</div>
					<ItemSubmitForm placeholder="+ New Group" onSubmit={onGroupSubmit} />
				</div>
			)}
		</SidebarContext.Consumer>
	);
};

export default (props) => (
	<ApolloConsumer>
		{(client) => (
			<NotifyQueueContext.Consumer>
				{(notify) => <CalendarSidebar {...props} client={client} notify={notify} />}
			</NotifyQueueContext.Consumer>
		)}
	</ApolloConsumer>
);
