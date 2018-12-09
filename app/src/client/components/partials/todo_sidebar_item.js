import React from 'react';

const TodoSidebarItem = (props) => (
  <div className={`todo-sidebar-item-000 ${props.active && 'todo-sidebar-item-000-active'}`}>
    <div className='sidebar-item-001-hamburger'>
      <div></div><div></div><div></div>
    </div>
    <p>{props.group.title}</p>
  </div>
);

export default TodoSidebarItem;