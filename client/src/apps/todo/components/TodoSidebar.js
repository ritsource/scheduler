import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TodoSidebarItem from './TodoSidebarItem';

const TodoSidebar = (props) => {
	const { groups, changeGroupId } = props;

	// Title of new Group Input
	// const [ title, setTitle ] = useState('');

	// Handeler for adding new group
	const addNewGroup = (title) => {};

	// Dnd handeler
	const onDragEnd = (result) => {};

	return (
		<div className="TodoSidebar-c-00">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppableId-sidebar" type="GROUP_DND">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps} className="TodoSidebar-The-List-01">
							{groups.map((group, i) => {
								return (
									<TodoSidebarItem key={i} index={i} group={group} changeGroupId={changeGroupId} />
								);
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<p>TodoSidebar</p>
		</div>
	);
};

export default TodoSidebar;
