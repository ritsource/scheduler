import React from 'react';

const TodoSidebarComp = (props) => (
  <div>
    TodoSidebarComp
    <div>{props.groups.map((group, i) => (
      <p key={i}>{i + 1}. {group.title}</p>
    ))}</div>
  </div>
);

export default TodoSidebarComp;