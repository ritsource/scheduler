import React from 'react';

import { FETCH_ALL_GROUPS_ON_CALENDAR } from '../../../graphql/queries';
import { Query } from 'react-apollo';

import CalendarComp from './CalendarComp';

const CalendarPage = (props, staticContext) => {
	return (
		<Query query={FETCH_ALL_GROUPS_ON_CALENDAR}>
			{({ data, loading, error }) => {
				// console.log('My data', data);

				return (
					<React.Fragment>
						{data.readGroupsOnCalendar ? (
							<CalendarComp staticContext={staticContext} groups={data.readGroupsOnCalendar || []} />
						) : (
							<div>Unable to Fetch Data, try Again</div>
						)}
					</React.Fragment>
				);
			}}
		</Query>
	);
};

export default {
	component: CalendarPage,
	loadData: function(client) {
		return client.query({ query: FETCH_ALL_GROUPS_ON_CALENDAR });
	}
};
