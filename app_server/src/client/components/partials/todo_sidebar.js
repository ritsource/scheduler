import React from 'react';
import { Link } from 'react-router-dom';

import TodoSidebarItem from './todo_sidebar_item';

const TodoSidebarComp = (props) => (
  <div className={`todo-sidebar-000 ${props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
    {/* <div style={{ background: 'white' }} className='todo-sidebar-001-dropzone' id={0}></div> */}
    {props.groups.map((group, i) => (
      <React.Fragment>
        <Link to={`/todo?group=${group._id}`} onClick={() => {
          props.changeGroupId(group._id);
        }}>
          <TodoSidebarItem key={i} group={group} active={group._id === props.active_groupId} />
        </Link>
        {/* <div className='todo-sidebar-001-dropzone' id={i + 1}></div> */}
      </React.Fragment>
    ))}
  </div>
);

export default TodoSidebarComp;