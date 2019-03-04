import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

import CalendarRow from './CalendarRow';

const CalendarContent = (props) => {
	const { miniCalendar, miniCalendarState } = props;

	const dateProps = miniCalendar ? miniCalendarState : props;
	const { month, year } = dateProps;

	// States (Hooks)
	const [ dayOneIndex, setDayOneIndex ] = useState(new Date(year, month, 1).getDay());
	const [ dateDistMap, setDateDistMap ] = useState({});
	const [ dateDistMapInverse, setDateDistMapInverse ] = useState({});
	const [ eventDistMap, setEventDistMap ] = useState({});
	const [ newEvent, setNewEvent ] = useState(null);
	// dropdown_visible: false,
	// dropdown_close: false

	const handleUrlNavigation = (argYear, argMonth) => {
		const history = createBrowserHistory();
		history.push(`/calendar?year=${argYear}&month=${argMonth}`);
	};

	// Grnerate & Update Date Distribution Object
	const updateDateDistribution = (argYear, argMonth) => {
		const tempDistMap = {};
		const tempDistMapInverse = {};

		// Loop for 42 Times - for 42 Box-es
		for (let k = 0; k < 42; k++) {
			const value = new Date(argYear, argMonth, k - dayOneIndex + 1).valueOf();
			tempDistMap[k] = value;
			tempDistMapInverse[value] = k;
		}

		setDateDistMap(tempDistMap);
		setDateDistMapInverse(tempDistMapInverse);
	};

	useEffect(
		() => {
			setDayOneIndex(new Date(year, month, 1).getDay());
			console.log('NOW! NOW! NOW! NOW!');

			updateDateDistribution(year, month);
			// updateEventDistribution
		},
		[ year, month ]
	);
	// }, [ year, month ])

	// Number of Days Current Month
	const numDatesThis = new Date(year, month + 1, 0).getDate();
	// Number of Days Previous Month
	const numDatesPrev = new Date(year, month, 0).getDate();
	// Checking Number of Days in Current Month
	const isFiveRows = dayOneIndex + numDatesThis <= 35;
	// Row for Iretating
	const rowArr = isFiveRows ? [ 1, 2, 3, 4, 5 ] : [ 1, 2, 3, 4, 5, 6 ];

	return (
		<div className={miniCalendar ? 'CalendarContent-c-00-Mini' : 'CalendarContent-c-00'}>
			{rowArr.map((x, i) => {
				return (
					<CalendarRow
						key={i}
						index={i}
						numDatesPrev={numDatesPrev} // Number of days in the Previous Month
						numDatesThis={numDatesThis} // Number of days in the This Month
						year={year} // { year } from (probably) context State
						month={month} // { month } from (probably) context State
						isFiveRows={isFiveRows} // if a 5-row-month { true } else { flase }
						handleUrlNavigation={handleUrlNavigation} // Function for Month Navigation + URL
						dateDistMap={dateDistMap} // { dateDistMap } from Component-State
						dateDistMapInverse={dateDistMapInverse} // { dateDistMapInverse } from Component-State
						eventDistMap={eventDistMap} // { eventDistMap } from Component-State
						// For Mini-Calendar Only
						miniCalendar={miniCalendar} // If it's Mini-Calendar or Not
						miniCalendarState={miniCalendarState} // Mini-Calendar State { year } and { month }
						// For Big-Calendar Only
						// toggleEventDetails
						// newEventModalFunc
					/>
				);
			})}
		</div>
	);
};

export default CalendarContent;
