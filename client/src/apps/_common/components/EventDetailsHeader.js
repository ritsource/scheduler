import React, { useState, useEffect } from 'react';

import EventDoneIndicator from './EventDoneIndicator';

const EventDetailsHeader = (props) => {
	const { event, hex_color, handleEventEdit, eventDoneHandeler } = props;

	const [ title, setTitle ] = useState(event.title);
	const [ isDone, setIsDone ] = useState(event._isDone);

	useEffect(
		() => {
			if (event.title !== title) setTitle(event.title);
			setIsDone(event._isDone);
		},
		[ event.title, event._isDone ]
	);

	return (
		// <div style={{ padding: '0px 0px' /*border: '1px solid red' */ }}>
		<div className="EventDetailsHeader-c-00">
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (title !== '') {
						await handleEventEdit({ title });
						document.querySelector('#EventDetailsHeader-Input-xx').blur();
					}
				}}
			>
				<EventDoneIndicator
					_isDone={isDone}
					hex_color={hex_color}
					patchFunction={() => {
						eventDoneHandeler(event._id, !isDone);
						setIsDone(!isDone);
					}}
				/>
				<input
					id="EventDetailsHeader-Input-xx"
					className="Theme-Input-Underline-OnFoucs-99"
					type="text"
					autoComplete="Off"
					placeholder="Event Name"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default EventDetailsHeader;
