import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer } from 'react-apollo';

import EventListHeader from './EventListHeader';
import EventListItem from './EventListItem';
import ItemSubmitForm from '../../_common/components/ItemSubmitForm';

import NotifyQueueContext from '../../_common/contexts/NotifyQueueContext';

import {
	ADD_NEW_EVENT,
	EDIT_EVENT_TO_DONE,
	EDIT_EVENT_TO_NOT_DONE,
	REARRANGE_EVENTS
} from '../../../graphql/mutations';

const EventList = (props) => {
	const { activeGroup, client, notify, changeEventId } = props;

	const [ events, setEvents ] = useState(props.events);

	useEffect(
		() => {
			setEvents(props.events);
		},
		[ props.events ]
	);

	// Handle DnD
	const onDragEnd = (result) => {
		if (result.source.index === result.destination.index) return;

		const tempEvents = [ ...events ];

		const fromIndex = result.source.index;
		const toIndex = result.destination.index;

		const movedEvents =
			fromIndex < toIndex
				? tempEvents.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
				: tempEvents.slice(toIndex, fromIndex).map(({ _id }) => _id);

		client.mutate({
			mutation: REARRANGE_EVENTS,
			variables: {
				focusedEvent: result.draggableId,
				fromRank: tempEvents[fromIndex]._rank,
				toRank: tempEvents[toIndex]._rank,
				movedEvents: movedEvents
			},
			refetchQueries: 'readAllGroups',
			awaitRefetchQueries: true
		});

		const focusedEvent = tempEvents.splice(fromIndex, 1)[0];
		tempEvents.splice(toIndex, 0, focusedEvent);

		setEvents(tempEvents);
	};

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
		notify.addToQueue('Saving...');
		client
			.mutate({
				mutation: ADD_NEW_EVENT,
				variables: { title, _group: activeGroup._id },
				refetchQueries: [ 'readAllGroups' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				notify.removeFromQueue('Saving...');
				scrollToBottom('.EventList-The-List-01');
			})
			.catch(() => {
				notify.removeFromQueue('Saving...');
				notify.addToQueue('Failed!');
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

export default (props) => (
	<ApolloConsumer>
		{(client) => (
			<NotifyQueueContext.Consumer>
				{(notify) => <EventList {...props} client={client} notify={notify} />}
			</NotifyQueueContext.Consumer>
		)}
	</ApolloConsumer>
);
