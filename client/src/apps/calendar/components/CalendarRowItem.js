import React, { useState, useEffect } from 'react';

import { month_name_dictionary, day_name_dictionary } from '../../../utils/constants';
import CalendarEvent from './CalendarEvent';

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
		setActiveEvent
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

					<div
						className="CalendarRowItem-Event-Level-01"
						style={
							rowIndex === 0 ? (
								{ marginTop: '5px', height: `calc(100% - 55px)`, width: 'calc(100% / 7)' }
							) : (
								{ marginTop: '5px', height: `calc(100% - 35px)`, width: 'calc(100% / 7)' }
							)
						}
					>
						{eventDistMap[itemIndex] &&
							eventDistMap[itemIndex].map((event, i) => {
								if (event.val === null) {
									return <div key={i} className="calendar-row-item-empty-event" />;
								} else if (event.val === false) {
									// return (<div key={i} className='calendar-row-item-empty-event' style={{ background: 'red', opacity: 0.5 }}></div>);
									return (
										<CalendarEvent
											visible={false}
											key={i}
											event={event.refEvent}
											setActiveEvent={setActiveEvent}
										/>
									);
								} else if (event.val) {
									// console.log('itemIndex', itemIndex);

									return (
										<CalendarEvent
											visible={true}
											key={i}
											event={event.val}
											setActiveEvent={setActiveEvent}
										/>
									);
								}
							})}
					</div>
					{/* )} */}
				</React.Fragment>
			</div>
		);
	}
};

export default CalendarRowItem;
