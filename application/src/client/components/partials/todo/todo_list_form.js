import React, { useState, useEffect } from 'react';

export const TodoListForm = (props) => {
	const [ title, setTitle ] = useState('');

	return (
		<form
			className="any-list-comp-bottom-form-999"
			onSubmit={async (e) => {
				e.preventDefault();
				await props.asyncPostEvent({
					title: title,
					_group: props.activeGroup._id,
					hex_color: props.activeGroup.hex_color
				});
				setTitle('');
				scrollToBottom('#the-event-list-inside-container');
			}}
		>
			<input
				name="title"
				autoComplete="off"
				className=""
				placeholder="+ Add a Task"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			{title !== '' && (
				<button name="Add a new Event" className="any-list-comp-form-submit-btn-003" type="submit">
					Add
				</button>
			)}
		</form>
	);
};

export default TodoListForm;
