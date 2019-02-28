import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import TodoSidebarItem from './TodoSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import { ADD_NEW_GROUP } from '../../../graphql/mutations';

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
				scrollToBottom('.TodoSidebar-The-List-01');
			});
	};

	// Dnd handeler
	const onDragEnd = (result) => {};

	return (
		<div className="TodoSidebar-c-00">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppableId-sidebar" type="GROUP_DND">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="TodoSidebar-The-List-01">
							{groups.map((group, i) => {
								return (
									<TodoSidebarItem key={i} index={i} group={group} changeGroupId={changeGroupId} />
								);
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<ItemSubmitForm placeholder="+ New Group" onSubmit={onGroupSubmit} />
		</div>
	);
};

export default (props) => <ApolloConsumer>{(client) => <TodoSidebar {...props} client={client} />}</ApolloConsumer>;
