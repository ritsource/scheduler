import React from 'react';

const TodoListIndicator = (props) => (
  <div
    className={`todo-list-indicator-000 ${props._isDone && 'indicator-_isDone'}`}
    style={props._isDone ? {
      background: props.hex_color,
      color: 'white',
      border: `1px solid ${props.hex_color}`
    } : {
      color: props.hex_color,
      background: 'white',
      border: `1px solid ${props.hex_color}`
    }}
    onClick={props.patchFunction}
  >
    {props._isDone ? (
      <i className="fas fa-check"></i>
    ) : (
      <i style={props.hide_tick_on_false ? { color: 'white' } : {}} className="fas fa-check"></i>
    )}
  </div>
);

export default TodoListIndicator;