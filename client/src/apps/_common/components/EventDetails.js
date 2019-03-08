import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ApolloConsumer, Query } from 'react-apollo';

import StepStoreContext from '../contexts/StepStoreContext';
import EventDetailsHeader from '../components/EventDetailsHeader';
import ItemSubmitForm from './ItemSubmitForm';
import EventDetailsItem from './EventDetailsItem';
import EventDetailsBtns from './EventDetailsBtns';

import { FETCH_STEPS_BY_EVENT } from '../../../graphql/queries';
import {
	EDIT_EVENT_BY_ID,
	EDIT_EVENT_DATES,
	EDIT_EVENT_TO_DONE,
	EDIT_EVENT_TO_NOT_DONE,
	DELETE_EVENT,
	ADD_NEW_STEP,
	EDIT_STEP_BY_ID,
	DELETE_STEP,
	EDIT_STEP_TO_DONE,
	EDIT_STEP_TO_NOT_DONE,
	REARRANGE_STEPS
} from '../../../graphql/mutations';

const EventDetails = (props) => {
	const { event, groups, contextSteps, setContextSteps, client, pathName, hex_color, closeEventDetails } = props;

	const [ steps, setSteps ] = useState([]);
	const [ reRenderMnky, setReRenderMnky ] = useState(true);

	const gqlRefetchQueries = pathName === 'todo' ? [ 'readAllGroups' ] : [ 'readGroupsOnCalendar' ];

	// useEffect(
	// 	() => {
	// 		// readAndSaveStepsData();
	// 		if (steps.length > 0) {
	// 			setContextSteps([ ...contextSteps.filter(({ _event }) => _event !== event._id), ...steps ]);
	// 		}
	// 	},
	// 	[ steps ]
	// );

	useEffect(
		() => {
			client
				.query({
					query: FETCH_STEPS_BY_EVENT,
					variables: { eventId: event._id }
				})
				.then(({ data }) => {
					console.log(data.readStepsByEvent);

					setSteps(data.readStepsByEvent);
				});

			return () => setSteps([]);
		},
		[ event ]
	);

	// Handle New Step Submit
	const onStepSubmit = (title) => {
		client
			.mutate({
				mutation: ADD_NEW_STEP,
				variables: { title, _event: event._id },
				refetchQueries: [ 'readStepsByEvent' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				scrollToBottom('.EventDetails-The-List-01');
			});
	};

	// Handle Event Edit
	const handleStepEdit = async ({ stepId, title }) => {
		await client.mutate({
			mutation: EDIT_STEP_BY_ID,
			variables: { stepId, title },
			refetchQueries: [ 'readStepsByEvent' ]
		});
	};

	const handleStepDelete = async (stepId) => {
		await client.mutate({
			mutation: DELETE_STEP,
			variables: { stepId },
			refetchQueries: [ 'readStepsByEvent' ]
		});
	};

	const stepDoneHandeler = async (stepId, boolean) => {
		await client.mutate({
			mutation: boolean ? EDIT_STEP_TO_DONE : EDIT_STEP_TO_NOT_DONE,
			variables: { stepId },
			refetchQueries: [ 'readStepsByEvent' ]
		});
	};

	const onDragEnd = (result) => {
		if (result.source.index === result.destination.index) return;

		const tempSteps = [ ...steps ];

		const fromIndex = result.source.index;
		const toIndex = result.destination.index;

		const movedSteps =
			fromIndex < toIndex
				? tempSteps.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
				: tempSteps.slice(toIndex, fromIndex).map(({ _id }) => _id);

		client
			.mutate({
				mutation: REARRANGE_STEPS,
				variables: {
					focusedStep: result.draggableId,
					fromRank: tempSteps[fromIndex]._rank,
					toRank: tempSteps[toIndex]._rank,
					movedSteps: movedSteps
				},
				refetchQueries: [ 'readStepsByEvent' ],
				awaitRefetchQueries: true
			})
			.then(() => {});

		const focusedStep = tempSteps.splice(fromIndex, 1)[0];
		tempSteps.splice(toIndex, 0, focusedStep);

		// console.log('tempSteps', tempSteps);

		console.log('LOL');
		setReRenderMnky(false);
		setSteps(tempSteps);
	};

	useEffect(
		() => {
			// FIXME: couldn't fix the bug but feigured a way out (something is wrong, file a issue maybe)
			window.getSteps = () => steps;
			setReRenderMnky(true);
		},
		[ steps ]
	);

	// Handle Event Delete
	const handleEventDelete = async () => {
		await client.mutate({
			mutation: DELETE_EVENT,
			variables: { eventId: event._id },
			refetchQueries: gqlRefetchQueries
		});
	};

	// Handle Event Edit
	const handleEventEdit = async ({ title, description, _group }) => {
		await client.mutate({
			mutation: EDIT_EVENT_BY_ID,
			variables: { eventId: event._id, title, description, _group },
			refetchQueries: gqlRefetchQueries,
			awaitRefetchQueries: true
		});
	};

	// Handle  Event Dates Edit
	const handleEventDateEdit = async ({ date_from, date_to }) => {
		await client.mutate({
			mutation: EDIT_EVENT_DATES,
			variables: { eventId: event._id, date_from, date_to },
			refetchQueries: gqlRefetchQueries,
			awaitRefetchQueries: true
		});
	};

	// Handle Event Done / Undone
	const eventDoneHandeler = async (eventId, boolean) => {
		await client.mutate({
			mutation: boolean ? EDIT_EVENT_TO_DONE : EDIT_EVENT_TO_NOT_DONE,
			variables: { eventId },
			refetchQueries: gqlRefetchQueries
		});
	};

	return (
		<div className="EventDetails-c-00">
			<EventDetailsHeader
				hex_color={pathName === 'todo' ? hex_color : event.hex_color}
				event={event}
				handleEventEdit={handleEventEdit}
				eventDoneHandeler={eventDoneHandeler}
			/>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={event._id} type="STEP_DND">
					{(provided) => (
						<div className="EventDetails-The-List-01" ref={provided.innerRef} {...provided.droppableProps}>
							{reRenderMnky &&
								steps.map((step, i) => {
									// if (i === 0) console.log('XXX');
									// console.log(i, step.title);
									// console.log(steps);

									// FIXME: A Bug Exist Here!
									// "contextSteps" isn't getting rerendered after Drag&Drop ends

									return (
										<EventDetailsItem
											key={i}
											index={i}
											step={step}
											hex_color={hex_color}
											handleStepEdit={handleStepEdit}
											handleStepDelete={handleStepDelete}
											stepDoneHandeler={stepDoneHandeler}
										/>
									);
								})}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<ItemSubmitForm placeholder="+ Add Step" onSubmit={onStepSubmit} />

			<EventDetailsBtns
				event={event}
				groups={groups}
				hex_color={hex_color}
				handleEventEdit={handleEventEdit}
				handleEventDateEdit={handleEventDateEdit}
				handleEventDelete={handleEventDelete}
				closeEventDetails={closeEventDetails}
			/>
		</div>
	);
};

export default (props) => (
	<StepStoreContext.Consumer>
		{(context) => (
			<ApolloConsumer>
				{(client) => (
					<EventDetails
						contextSteps={context.steps}
						setContextSteps={context.setSteps}
						{...props}
						client={client}
					/>
				)}
			</ApolloConsumer>
		)}
	</StepStoreContext.Consumer>
);
