import React, { useState, useEffect } from 'react';
import CalendarSidebar from '../components/CalendarSidebar';

const CalendarComp = (props) => {
	const { staticContext, groups } = props;

	const [ activeEvent, setActiveEvent ] = useState(null);

	// console.log('data', groups);

	return (
		<div className="CalendarComp-c-00">
			<CalendarSidebar staticContext={staticContext} groups={groups} />

			<div>CalendarComp 2</div>
		</div>
	);
};

export default CalendarComp;
