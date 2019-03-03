import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import CalendarSidebarItem from './CalendarSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';
import SidebarContext from '../../_common/contexts/SidebarContext';

import { ADD_NEW_GROUP } from '../../../graphql/mutations';

const CalendarSidebar = (props) => {
	const { groups, changeGroupId, client } = props;

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
