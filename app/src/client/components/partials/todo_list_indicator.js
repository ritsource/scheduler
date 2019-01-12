import React from 'react';
import { FaCheck } from 'react-icons/fa';

const TodoListIndicator = (props) => (
  <div
    className={`todo-list-indicator-000 ${props._isDone && 'indicator-_isDone'}`}
    style={props._isDone ? {
      background: props.hex_color,
      color: 'var(--background-color)',
      border: `1px solid ${props.hex_color}`
    } : {
      color: props.hex_color,
      background: 'var(--background-color)',
      border: `1px solid ${props.hex_color}`
    }}
    onClick={props.patchFunction}
  >
    {props._isDone ? (
      <FaCheck />
    ) : (
      <FaCheck style={props.hide_tick_on_false  ? {
        color: 'var(--background-color)'
      } : {}}/>
    )}
  </div>
);

export default TodoListIndicator;