import React from 'react';

import EventListHeader from './EventListHeader';

const EventList = (props) => {
	const { events, activeGroup } = props;

	// Handle DnD
	const onDragEnd = () => {};

	return (
		<div className="EventList-c-00">
			<EventListHeader activeGroup={activeGroup} />
			<p>EventList</p>
		</div>
	);
};

export default EventList;
