import React from 'react';
import { Link } from 'react-router-dom';

import TodoSidebarItem from './todo_sidebar_item';

const TodoSidebarComp = (props) => (
  <div className='todo-sidebar-000'>
    <div>{props.groups.map((group, i) => (
      <Link to={`/todo?group=${group._id}`} onClick={() => {
        props.changeGroupId(group._id);
      }}>
        <TodoSidebarItem key={i} group={group} x_fact={group._id} />
      </Link>
    ))}</div>
  </div>
);

export default TodoSidebarComp;