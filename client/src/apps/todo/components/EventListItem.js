import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import dateFormat from 'dateformat';

import EventDoneIndicator from '../../_common/components/EventDoneIndicator';

const EventListItem = (props) => {
	const { index, event, activeGroup, eventDoneHandeler, changeEventId } = props;

	const [ isDone, setIsDone ] = useState(event._isDone);

	return (
		<Draggable draggableId={event._id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="EventListItem-c-00 Theme-Slide-Background-onHover-99"
					onClick={() => changeEventId(event._id)}
				>
					<EventDoneIndicator
						_isDone={isDone}
						hex_color={activeGroup.hex_color}
						patchFunction={() => {
							eventDoneHandeler(event._id, !isDone);
							setIsDone(!isDone);
						}}
					/>
					<p className="">
						<span style={event._isDone ? { textDecoration: 'line-through' } : {}}>{event.title}</span>
						<br />
						<span style={{ color: 'var(--text-color-light-3)', fontSize: '12px' }}>
							{dateFormat(event.date_from, 'mmmm dS')}
							&nbsp;&nbsp;{'->'}&nbsp;&nbsp;
							{dateFormat(event.date_to, 'mmmm dS')}
						</span>
					</p>
				</div>
			)}
		</Draggable>
	);
};

export default EventListItem;
