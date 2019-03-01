import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TodoSidebarItem = (props) => {
	const { group, index, active, changeGroupId } = props;

	return (
		<Draggable draggableId={group._id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={`TodoSidebarItem-c-00 Theme-Slide-Background-onHover-99 ${active &&
						'TodoSidebarItem-c-00-Active'}`}
					// style={index === 0 ? { paddingTop: '8px' } : {}}
					onClick={() => {
						changeGroupId(group._id);
					}}
				>
					<div {...provided.dragHandleProps} className="TodoSidebarItem-Hamburger-Div-01">
						<div style={{ background: group.hex_color }} />
						<div style={{ background: group.hex_color }} />
						<div style={{ background: group.hex_color }} />
					</div>
					<p>{group.title}</p>
				</div>
			)}
		</Draggable>
	);
};

export default TodoSidebarItem;
