import React from 'react';

const TodoListItem = (props) => (
  <div className={`todo-list-item-000 ${props.active && 'todo-list-item-000-active'}`}>
    {/* <div className='sidebar-item-001-hamburger'>
      <div></div><div></div><div></div>
    </div> */}
    <p>{props.event.title}</p>
  </div>
);

export default TodoListItem;