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
		miniCalendarState,
		handleUrlNavigation,
		handleMainCalendarNavigation
	} = props;

	const dateProps = miniCalendar ? miniCalendarState : props;
	const { month, year } = dateProps;

	const itemIndex = rowIndex * 7 + index;
	const aDayOfThisMonth = new Date(dateStamp).getMonth() === month;
	const _isToday = dateStamp === new Date().setHours(0, 0, 0, 0).valueOf();

	if (props.miniCalendar) {
		return (
			<div
				className={`CalendarRowItem-c-00-Mini ${!aDayOfThisMonth && 'CalendarRowItem-c-00-Mini-Not-In-Month'}`}
			>
				<div
					className={`${_isToday && 'CalendarRowItem-c-00-Mini-Active-Date'}`}
					onClick={() => {
						// handleMainCalendarNavigation({ year, month });
						handleUrlNavigation({ year, month });
					}}
				>
					<p>{props.date}</p>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className="CalendarRowItem-c-00"
				style={props.index === 6 ? { borderRight: '0px solid white' } : {}}
				onClick={() =>
					props.newEventModalFunc({
						// date_from: new Date().setHours(0,0,0,0).valueOf(),
						// date_to: new Date().setHours(0,0,0,0).valueOf(),
						date_from: dateStamp,
						date_to: dateStamp,
						title: ''
					})}
			>
				<React.Fragment>
					{rowIndex === 0 && (
						<div style={{ height: '20px', marginLeft: '10px', display: 'flex', alignItems: 'flex-end' }}>
							<p className="CalendarRowItem-P-02">{day_name_dictionary[props.index]}</p>
						</div>
					)}
					{_isToday ? (
						<div className="CalendarRowItem-Div-01 CalendarRowItem-c-00-Mini-Active-Date">
							<p>{props.date}</p>
						</div>
					) : (
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<div className="CalendarRowItem-Div-01">
								<p>{props.date}</p>
							</div>
						</div>
					)}
				</React.Fragment>
			</div>
		);
	}
};

export default CalendarRowItem;
