import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import TodoSidebarItem from './TodoSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import { ADD_NEW_GROUP, REARRANGE_GROUP } from '../../../graphql/mutations';
import { FETCH_ALL_GROUPS } from '../../../graphql/queries';

import SidebarContext from '../../_common/contexts/SidebarContext';

const TodoSidebar = (props) => {
	const { groups, changeGroupId, client } = props;

	// const [] = useState(groups);

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
	const onDragEnd = (result) => {
		if (result.source.index === result.destination.index) return;

		const tempGroup = [ ...groups ];

		const fromIndex = result.source.index;
		const toIndex = result.destination.index;

		const movedGroups =
			fromIndex < toIndex
				? tempGroup.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
				: tempGroup.slice(toIndex, fromIndex).map(({ _id }) => _id);

		client.mutate({
			mutation: REARRANGE_GROUP,
			variables: {
				focusedGroup: result.draggableId,
				fromRank: tempGroup[fromIndex]._rank,
				toRank: tempGroup[toIndex]._rank,
				movedGroups: movedGroups
			},
			refetchQueries: 'readAllGroups',
			awaitRefetchQueries: true
		});

		const focusedGroup = tempGroup.splice(fromIndex, 1)[0];
		tempGroup.splice(toIndex, 0, focusedGroup);

		client.writeQuery({
			query: FETCH_ALL_GROUPS,
			data: {
				readAllGroups: [ ...tempGroup ]
			}
		});
	};

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
