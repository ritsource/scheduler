import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TodoSidebarItem = (props) => (
  <Draggable draggableId={props.group._id} index={props.index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`todo-sidebar-item-000 ${props.active && 'todo-sidebar-item-000-active'}`}
        onClick={() => {
          props.changeGroupId(props.group._id);
        }}
      >
        <div className='sidebar-item-001-hamburger'>
          <div style={{ background: props.group.hex_color }}></div>
          <div style={{ background: props.group.hex_color }}></div>
          <div style={{ background: props.group.hex_color }}></div>
        </div>
        <p>{props.group.title}</p>
      </div>
    )}
  </Draggable>
);

export default TodoSidebarItem;