import React, { useState, useEffect } from 'react';
import EventDoneIndicator from '../event_done_indicator';

const EventDetailsHeaderComp = (props) => {
	const [ title, setTitle ] = useState(props.event.title || ' ');

	const { event } = props;

	useEffect(() => {
		if (event && event.title !== title) setTitle(event.title);
	}, []);

	return (
		<div style={{ padding: '0px 0px' /*border: '1px solid red' */ }}>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (title !== '') {
						await props.asyncEditEvent(event._id, { title });
						if (document) document.querySelector('#todo-details-input-inside-form').blur();
					}
				}}
			>
				<EventDoneIndicator
					_isDone={event._isDone}
					hex_color={props.hex_color}
					patchFunction={() => {
						props.asyncPatchEvent_isDone(event._id, !event._isDone);
					}}
				/>
				<input
					id="todo-details-input-inside-form"
					name="listname"
					autoComplete="off"
					className="awesome-app-transparent-input-999"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default EventDetailsHeaderComp;
