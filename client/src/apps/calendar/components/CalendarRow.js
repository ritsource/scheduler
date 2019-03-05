import React, { useState, useEffect } from 'react';

import CalendarRowItem from './CalendarRowItem';

const CalendarRow = (props) => {
	const {
		index,
		dateDistMap,
		dateDistMapInverse,
		eventDistMap,
		miniCalendar,
		miniCalendarState,
		handleUrlNavigation,
		isFiveRows,
		setActiveEvent,
		newEventModalFunc
	} = props;
	let itemArr = [ 1, 2, 3, 4, 5, 6, 7 ];

	const miniCalendarStyle = isFiveRows ? { height: 'calc(100% / 5)' } : { height: 'calc(100% / 6)' };
	const calendarStyle_first = isFiveRows
		? { height: 'calc((100% / 5) + 20px - 5px)' }
		: { height: 'calc((100% / 6) + 20px - 4px)' };
	const calendarStyle_rest = isFiveRows
		? { height: 'calc(((100% - 20px) / 5) - 1px)' }
		: { height: 'calc(((100% - 20px) / 6) - 1px)' };

	return (
		<div
			className={miniCalendar ? 'CalendarRow-c-00-Mini' : 'CalendarRow-c-00'}
			style={miniCalendar ? miniCalendarStyle : index === 0 ? calendarStyle_first : calendarStyle_rest}
		>
			{itemArr.map((x, i) => {
				const dateStamp = dateDistMap[i + index * 7];

				return (
					<CalendarRowItem
						key={i}
						index={i}
						rowIndex={index} // Index of the Parent Row
						date={new Date(dateStamp).getDate() || index * 7 + i} // Date
						dateStamp={dateStamp} // Date Timestamp
						dateDistMap={dateDistMap} // { dateDistMap } from Props
						dateDistMapInverse={dateDistMapInverse} // { dateDistMap } from Props
						eventDistMap={eventDistMap} // { dateDistMap } from Props
						handleUrlNavigation={handleUrlNavigation} // { handleUrlNavigation } from Props
						miniCalendar={miniCalendar} // { miniCalendar } from Props
						miniCalendarState={miniCalendarState} // { miniCalendarState } from Props
						setActiveEvent={setActiveEvent}
						newEventModalFunc={newEventModalFunc}
						// handleMainCalendarNavigation={handleMainCalendarNavigation} // Self Explainatory
					/>
				);
			})}
		</div>
	);
};

export default CalendarRow;
