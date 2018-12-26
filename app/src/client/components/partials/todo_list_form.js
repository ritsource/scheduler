import React from 'react';

const TodoListForm = (props) => (
  <form className='todo-list-001-new-task-form' onSubmit={(e) => {
    e.preventDefault();
    props.asyncPostEvent({
      title: props.title,
      _group: props.active_groupId
    }).then(() => {
      props.setParentState({ title: '' });
      scrollToBottom('.todo-list-002-the-list');
    });
  }}>
    <input
      name='title'
      autoComplete='off'
      className=''
      placeholder='+ Add a Task'
      value={props.title}
      onChange={(e) => {
        props.setParentState({ title: e.target.value });
      }}
    />
    {props.title !== '' && (
      <button type='submit'>Add</button>
    )}
  </form>
);

export default TodoListForm;