import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import StepStoreContext from '../contexts/StepStoreContext';

import { FETCH_STEPS_BY_EVENT } from '../../../graphql/queries';

const EventDetails = (props) => {
	const { event } = props;

	const [ stepTitle, setStepTitle ] = useState('');

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

	return (
		<StepStoreContext.Consumer>
			{(context) => {
				return (
					<Query query={FETCH_STEPS_BY_EVENT} variables={{ eventId: event._id }}>
						{({ data, loading, error }) => {
							if (data) {
								genContextObj(context.steps, data.readStepsByEvent);
							}

							return (
								<div className="EventDetails-c-00">
									<p>EventDetails</p>
									<div>
										{Object.values(context.steps).map((step, i) => {
											return <p key={i}>{step.title}</p>;
										})}
									</div>
								</div>
							);
						}}
					</Query>
				);
			}}
		</StepStoreContext.Consumer>
	);
};

export default EventDetails;
