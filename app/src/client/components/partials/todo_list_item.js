import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { asyncPatchEvent_isDone } from '../../actions/event_actions';
import TodoListIndicator from './todo_list_indicator';

const TodoListItem = (props) => (
  <Draggable draggableId={props.event._id} index={props.index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`todo-list-item-000 ${props.active && 'todo-list-item-000-active'}`}
        onClick={() => {
          props.changeEventId(props.event._id);
        }}
      >
        <TodoListIndicator
          _isDone={props.event._isDone}
          hex_color={props.event.hex_color}
          patchFunction={() => {
            props.asyncPatchEvent_isDone(props.event._id, !props.event._isDone);
          }}
        />
        <p style={props.event._isDone ? { textDecoration: 'line-through' } : {}}>{props.event.title}</p>
      </div>
    )}
  </Draggable>
);

const mapDispatchToProps = (dispatch) => ({
  asyncPatchEvent_isDone: (xyz, abc) => dispatch(asyncPatchEvent_isDone(xyz, abc))
});

export default connect(null, mapDispatchToProps)(TodoListItem);