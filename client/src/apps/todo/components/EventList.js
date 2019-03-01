import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import EventListHeader from './EventListHeader';
import EventListItem from './EventListItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import { ADD_NEW_EVENT, EDIT_EVENT_TO_DONE, EDIT_EVENT_TO_NOT_DONE } from '../../../graphql/mutations';

const EventList = (props) => {
	const { events, activeGroup, client, changeEventId } = props;

	// Handle DnD
	const onDragEnd = () => {};

	// Handle Event Done & Undone
	const eventDoneHandeler = async (eventId, boolean) => {
		await client.mutate({
			mutation: boolean ? EDIT_EVENT_TO_DONE : EDIT_EVENT_TO_NOT_DONE,
			variables: { eventId },
			refetchQueries: [ 'readAllGroups' ],
			awaitRefetchQueries: true
		});
	};

	// Handle new Event Submit
	const onEventSubmit = (title) => {
		client
			.mutate({
				mutation: ADD_NEW_EVENT,
				variables: { title, groupId: activeGroup._id },
				refetchQueries: [ 'readAllGroups' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				scrollToBottom('.EventList-The-List-01');
			});
	};

	return (
		<div className="EventList-c-00">
			<EventListHeader activeGroup={activeGroup} />
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={props.activeGroup._id} type="EVENT_DND">
					{(provided) => (
						<div className="EventList-The-List-01" ref={provided.innerRef} {...provided.droppableProps}>
							{events.map((event, i) => {
								return (
									<EventListItem
										key={i}
										index={i}
										event={event}
										activeGroup={activeGroup}
										eventDoneHandeler={eventDoneHandeler}
										changeEventId={changeEventId}
									/>
								);
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<ItemSubmitForm placeholder="+ Add Event" onSubmit={onEventSubmit} />
		</div>
	);
};

export default (props) => <ApolloConsumer>{(client) => <EventList {...props} client={client} />}</ApolloConsumer>;
