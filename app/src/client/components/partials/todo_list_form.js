import React from 'react';

const TodoListForm = (props) => (
  <form className='any-list-comp-bottom-form-999' onSubmit={async (e) => {
    e.preventDefault();
    await props.asyncPostEvent({ title: props.title, _group: props.active_groupId });
    props.setParentState({ title: '' });
    scrollToBottom('#the-event-list-inside-container');
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