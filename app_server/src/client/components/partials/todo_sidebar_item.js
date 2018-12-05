import React from 'react';

const TodoSidebarItem = (props) => (
  <div className={`todo-sidebar-item-000 ${props.x_fact && 'todo-sidebar-item-000-active'}`}>
    <div className='sidebar-item-001-hamburger'>
      <div></div><div></div><div></div>
    </div>
    <p>{props.group.title} - Awesome</p>
  </div>
);

export default TodoSidebarItem;