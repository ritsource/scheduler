import React from 'react';

const TodoListHeader = (props) => (
  <div className='list-002-header'>
    <form onSubmit={(e) => {
      e.preventDefault();
      props.asyncEditGroup(
        props.active_groupId,
        { title: props.listTitle }
      );
    }}>
      <input
        name='listname'
        autoComplete='off'
        className={`
          ${(props.listTitle === '') && 'list-004-invalid-input'}
          ${!props.showFormButton && 'list-004-w-se-g-input'}
        `}
        value={props.listTitle}
        onChange={(e) => {
          props.setParentState({ listTitle: e.target.value });
        }}
      />
      {props.showFormButton && (<button type='submit'>Save</button>)}
    </form>
    <button
      className='list-003-trash-button'
      onClick={() => {
        props.asyncDeleteGroup(props.active_groupId);
      }}
    ><i class="far fa-trash-alt"></i></button>
  </div>
);

export default TodoListHeader;