import React, { useState, useEffect } from 'react';
import { ApolloConsumer, Query } from 'react-apollo';

import StepStoreContext from '../contexts/StepStoreContext';
import EventDetailsHeader from '../components/EventDetailsHeader';
import ItemSubmitForm from './ItemSubmitForm';

import { FETCH_STEPS_BY_EVENT } from '../../../graphql/queries';
import { EDIT_EVENT_BY_ID, EDIT_EVENT_TO_DONE, EDIT_EVENT_TO_NOT_DONE, ADD_NEW_STEP } from '../../../graphql/mutations';

const EventDetails = (props) => {
	const { event, client, pathName, hex_color } = props;

	// Grnerate Steps Obj
	const genContextObj = (prevObj, array = []) => {
		// data.readStepsByEvent
		array.map((step) => {
			prevObj[step._rank] = step;
		});

		return prevObj;
	};

	// Handle Event Delete
	const handleEventDelete = () => {};

	// Handle New Step Submit
	const onStepSubmit = async (title) => {
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
	const handleEventEdit = async ({ title, description }) => {
		await client.mutate({
			mutation: EDIT_EVENT_BY_ID,
			variables: { eventId: event._id, title, description },
			refetchQueries: [ 'readAllGroups' ],
			awaitRefetchQueries: true
		});
	};

	// Handle Event Done / Undone
	const eventDoneHandeler = async (eventId, boolean) => {
		await client.mutate({
			mutation: boolean ? EDIT_EVENT_TO_DONE : EDIT_EVENT_TO_NOT_DONE,
			variables: { eventId },
			refetchQueries: [ 'readAllGroups' ]
		});
	};

	return (
		<StepStoreContext.Consumer>
			{(context) => {
				return (
					<div className="EventDetails-c-00">
						<EventDetailsHeader
							hex_color={pathName === 'todo' ? hex_color : event.hex_color}
							event={event}
							handleEventEdit={handleEventEdit}
							eventDoneHandeler={eventDoneHandeler}
						/>

						<Query query={FETCH_STEPS_BY_EVENT} variables={{ eventId: event._id }}>
							{({ data, loading, error }) => {
								if (data) {
									genContextObj(context.steps, data.readStepsByEvent);
								}

								return (
									<div className="EventDetails-The-List-01">
										{Object.values(context.steps).map((step, i) => {
											if (step._event === event._id) {
												return <p key={i}>{step.title}</p>;
											}
										})}
									</div>
								);
							}}
						</Query>

						<ItemSubmitForm placeholder="+ Add Step" onSubmit={onStepSubmit} />
					</div>
				);
			}}
		</StepStoreContext.Consumer>
	);
};

export default (props) => <ApolloConsumer>{(client) => <EventDetails {...props} client={client} />}</ApolloConsumer>;
