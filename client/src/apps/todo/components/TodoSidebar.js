import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import TodoSidebarItem from './TodoSidebarItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import { ADD_NEW_GROUP, REARRANGE_GROUPS } from '../../../graphql/mutations';
import { FETCH_ALL_GROUPS } from '../../../graphql/queries';

import SidebarContext from '../../_common/contexts/SidebarContext';
import NotifyQueueContext from '../../_common/contexts/NotifyQueueContext';

const TodoSidebar = (props) => {
	const { groups, changeGroupId, client, notify } = props;

	// const [] = useState(groups);

	// Handeler for adding new group
	const onGroupSubmit = (title) => {
		notify.addToQueue('Saving...');
		// ADD_NEW_GROUP
		client
			.mutate({
				mutation: ADD_NEW_GROUP,
				variables: { title },
				refetchQueries: [ 'readAllGroups' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				notify.removeFromQueue('Saving...');
				scrollToBottom('.Sidebar-The-List-01');
			})
			.catch(() => {
				notify.removeFromQueue('Saving...');
				notify.addToQueue('Failed!');
			});
	};

	// Dnd handeler
	const onDragEnd = (result) => {
		if (result.source.index === result.destination.index) return;

		const tempGroups = [ ...groups ];

		const fromIndex = result.source.index;
		const toIndex = result.destination.index;

		const movedGroups =
			fromIndex < toIndex
				? tempGroups.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
				: tempGroups.slice(toIndex, fromIndex).map(({ _id }) => _id);

		client.mutate({
			mutation: REARRANGE_GROUPS,
			variables: {
				focusedGroup: result.draggableId,
				fromRank: tempGroups[fromIndex]._rank,
				toRank: tempGroups[toIndex]._rank,
				movedGroups: movedGroups
			},
			refetchQueries: 'readAllGroups',
			awaitRefetchQueries: true
		});

		const focusedGroup = tempGroups.splice(fromIndex, 1)[0];
		tempGroups.splice(toIndex, 0, focusedGroup);

		client.writeQuery({
			query: FETCH_ALL_GROUPS,
			data: {
				readAllGroups: [ ...tempGroups ]
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

export default (props) => (
	<ApolloConsumer>
		{(client) => (
			<NotifyQueueContext.Consumer>
				{(notify) => <TodoSidebar {...props} client={client} notify={notify} />}
			</NotifyQueueContext.Consumer>
		)}
	</ApolloConsumer>
);
