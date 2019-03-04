import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

import CalendarSidebar from '../components/CalendarSidebar';
import CalendarContent from '../components/CalendarContent';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const CalendarComp = (props) => {
	const { staticContext, groups } = props;
	const req = __isNode__ && staticContext ? staticContext.req : undefined;

	const urlParams = !__isNode__ ? new URLSearchParams(window.location.search) : { get: () => undefined };

	const getParam = (paramKey) => parseInt(__isNode__ && req ? req.query[paramKey] : urlParams.get(paramKey));

	const [ activeEvent, setActiveEvent ] = useState(null);
	const [ year, setYear ] = useState(getParam('year') || new Date().getFullYear());
	const [ month, setMonth ] = useState(getParam('month') || new Date().getMonth());

	useEffect(
		() => {
			console.log(getParam('year'), getParam('month'));
			setYear(getParam('year') || new Date().getFullYear());
			setMonth(getParam('month') || new Date().getMonth());
		},
		[ getParam('month') ]
	);

	const handleUrlNavigation = ({ year, month }) => {
		const history = createBrowserHistory();
		history.push(`/calendar?year=${year}&month=${month}`);
		setYear(year);
		setMonth(month);
	};

	// To Extract Events from Groups
	const extractEvents = (groups) => {
		return groups
			.map((group) => {
				return group._events;
			})
			.reduce((prevArr, current) => {
				return prevArr.concat(current);
			})
			.sort((a, b) => {
				if (a.date_from === b.date_from) {
					return a.date_from - a.date_to > b.date_from - b.date_to ? 1 : -1;
				}
				return a.date_from > b.date_from ? 1 : -1;
			});
	};

	return (
		<div className="CalendarComp-c-00">
			<CalendarSidebar staticContext={staticContext} groups={groups} handleUrlNavigation={handleUrlNavigation} />
			<CalendarContent year={year} month={month} setActiveEvent={setActiveEvent} events={extractEvents(groups)} />
		</div>
	);
};

export default CalendarComp;
