import React, { useState, useEffect } from 'react';
import CalendarSidebar from '../components/CalendarSidebar';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const CalendarComp = (props) => {
	const { groups } = props;

	const [ activeEvent, setActiveEvent ] = useState(null);

	// console.log('data', groups);

	return (
		<div className="CalendarComp-c-00">
			<CalendarSidebar groups={groups} />

			<div>CalendarComp 2</div>
		</div>
	);
};

export default CalendarComp;
