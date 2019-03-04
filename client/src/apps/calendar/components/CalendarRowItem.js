import React, { useState, useEffect } from 'react';

import { month_name_dictionary, day_name_dictionary } from '../../../utils/constants';

const CalendarRowItem = (props) => {
	const {
		index,
		rowIndex,
		dateStamp,
		dayOneIndex,
		dateDistMap,
		dateDistMapInverse,
		eventDistMap,
		miniCalendar,
		miniCalendarState
	} = props;

	const dateProps = miniCalendar ? miniCalendarState : props;
	const { month, year } = dateProps;

	const itemIndex = rowIndex * 7 + index;
	const aDayOfThisMonth = new Date(dateStamp).getMonth() === month;
	const _isToday = dateStamp === new Date().setHours(0, 0, 0, 0).valueOf();

	if (props.miniCalendar) {
		return (
			<div
				className={`calendar-row-item-000-mini ${!aDayOfThisMonth &&
					'calendar-row-item-000-mini-not-in-month'}`}
			>
				<div
					className={`${_isToday && 'calendar-row-item-mini-active-date'}`}
					onClick={() => {
						props.setReduxCalendar({ year, month });
						props.handleUrlNavigation(year, month);
					}}
				>
					<p>{props.date}</p>
				</div>
			</div>
		);
	}
};

export default CalendarRowItem;
