import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete } from 'react-icons/md';

import EventDoneIndicator from './EventDoneIndicator';

const EventDetailsItem = (props) => {
	const { step, hex_color, handleStepEdit, handleStepDelete, stepDoneHandeler } = props;
	const [ isDone, setIsDone ] = useState(step._isDone);
	const [ title, setTitle ] = useState(step.title);
	const [ isDeleted, setIsDeleted ] = useState(false);

	const onItemFormSubmit = (e) => {
		e.preventDefault();
		handleStepEdit({ stepId: step._id, title });
		document.querySelector(`#EventDetailsItem-Input-Inside-Form-${step._id}`).blur();
	};

	const onItemDelete = () => {
		setIsDeleted(true);
		handleStepDelete(step._id);
	};

	const onItemDoneUndone = () => {
		stepDoneHandeler(step._id, !isDone);
		setIsDone(!isDone);
	};

	if (isDeleted) {
		return null;
	}

	return (
		<Draggable draggableId={step._id} index={props.index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className="EventDetailsItem-c-00"
				>
					<EventDoneIndicator _isDone={isDone} hex_color={hex_color} patchFunction={onItemDoneUndone} />
					<form onSubmit={onItemFormSubmit}>
						<input
							className="Theme-Input-Underline-OnFoucs-99"
							style={step._isDone ? { textDecoration: 'line-through' } : {}}
							id={`EventDetailsItem-Input-Inside-Form-${step._id}`}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onBlur={onItemFormSubmit}
						/>
					</form>
					<div className="EventDetailsItem-Delete-Btn-01">
						<MdDelete style={{ marginBottom: '-2px' }} onClick={onItemDelete} />
					</div>
					{/* <div
				className="details-item-step-delete-button-001"
				onClick={() => {
					props.asyncDeleteStep(step._id);
				}}
			>
				X
			</div> */}
				</div>
			)}
		</Draggable>
	);
};

export default EventDetailsItem;
