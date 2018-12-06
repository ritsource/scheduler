import React from 'react';
import { connect } from 'react-redux';

import { asyncPatch_isDone } from '../../actions/event_actions';

const TodoListItem = (props) => (
  <div className={`todo-list-item-000 ${props.active && 'todo-list-item-000-active'}`}>
    <div
      className={`list-item-001-indicator ${props.event._isDone && 'indicator-_isDone'}`}
      onClick={() => {
        props.asyncPatch_isDone(props.event._id, !props.event._isDone);
      }}
    >
      {props.event._isDone ? (
        <i class="fas fa-check"></i>
      ) : (
        <i class="fas fa-check"></i>
      )}
    </div>
    <p className={props.event._isDone && 'list-item-001-p-_isDone'}>{props.event.title}</p>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  asyncPatch_isDone: (xyz, abc) => dispatch(asyncPatch_isDone(xyz, abc))
})

export default connect(null, mapDispatchToProps)(TodoListItem);