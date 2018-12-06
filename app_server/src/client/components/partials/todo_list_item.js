import React from 'react';

const TodoListItem = (props) => (
  <div className={`todo-list-item-000 ${props.active && 'todo-list-item-000-active'}`}>
    <div className={`list-item-001-indicator ${props.event._isDone && 'indicator-_isDone'}`}>
      {props.event._isDone ? (
        <i class="fas fa-check"></i>
      ) : (
        <i class="fas fa-check"></i>
      )}
    </div>
    <p className={props.event._isDone && 'list-item-001-p-_isDone'}>{props.event.title}</p>
  </div>
);

export default TodoListItem;