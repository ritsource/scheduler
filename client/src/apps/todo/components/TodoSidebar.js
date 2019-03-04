import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import TodoSidebarItem from './TodoSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import { ADD_NEW_GROUP } from '../../../graphql/mutations';

import SidebarContext from '../../_common/contexts/SidebarContext';

const TodoSidebar = (props) => {
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
				scrollToBottom('.Sidebar-The-List-01');
			});
	};

	// Dnd handeler
	const onDragEnd = (result) => {};

	return (
		<SidebarContext.Consumer>
			{(context) => (
				<div className={`Sidebar-c-00 ${context.sidebar && 'Sidebar-c-00-Hidden'}`}>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppableId-sidebar" type="GROUP_DND">
							{(provided) => (
								<div
									className="Sidebar-The-List-01"
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{groups.map((group, i) => {
										return (
											<TodoSidebarItem
												key={i}
												index={i}
												group={group}
												changeGroupId={changeGroupId}
											/>
										);
									})}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<ItemSubmitForm placeholder="+ New Group" onSubmit={onGroupSubmit} />
				</div>
			)}
		</SidebarContext.Consumer>
	);
};

export default (props) => <ApolloConsumer>{(client) => <TodoSidebar {...props} client={client} />}</ApolloConsumer>;
