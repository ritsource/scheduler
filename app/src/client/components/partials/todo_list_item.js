import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { asyncPatchEvent_isDone } from '../../actions/event_actions';

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
        <div
          className={`list-item-001-indicator ${props.event._isDone && 'indicator-_isDone'}`}
          style={props.event._isDone ? {
            background: props.hex_color,
            color: 'white',
            border: `1px solid ${props.hex_color}`
          } : {
            color: props.hex_color,
            background: 'white',
            border: `1px solid ${props.hex_color}`
          }}
          onClick={() => {
            props.asyncPatchEvent_isDone(props.event._id, !props.event._isDone);
          }}
        >
          {props.event._isDone ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-check"></i>
          )}
        </div>
        <p className={`${props.event._isDone && 'list-item-001-p-_isDone'}`}>{props.event.title}</p>
      </div>
    )}
  </Draggable>
);

const mapDispatchToProps = (dispatch) => ({
  asyncPatchEvent_isDone: (xyz, abc) => dispatch(asyncPatchEvent_isDone(xyz, abc))
});

export default connect(null, mapDispatchToProps)(TodoListItem);