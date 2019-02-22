import React from 'react';
import { FaCheck } from 'react-icons/fa';

const EventDoneIndicator = (props) => (
  <div
    className={`todo-list-indicator-000 ${props._isDone && 'indicator-_isDone'}`}
    style={props._isDone ? {
      color: 'var(--background-color)',
      background: props.hex_color,
      border: `1px solid ${props.hex_color}`
    } : {
      color: 'rgba(0, 0, 0, 0)',
      background: 'rgba(0, 0, 0, 0)',
      border: `1px solid ${props.hex_color}`
    }}
    onClick={props.patchFunction}
  >
    <FaCheck />
  </div>
);

export default EventDoneIndicator;