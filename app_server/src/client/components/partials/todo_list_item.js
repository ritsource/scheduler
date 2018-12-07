import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import { asyncPatch_isDone } from '../../actions/event_actions';

const TodoListItem = (props) => props.connectDragSource(
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
});

const itemSource = {
  beginDrag(props) {
    console.log('dragging..');
    return props.event;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return;
    return props.handleListItemDrop(props.event._id);
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default connect(null, mapDispatchToProps)(
  DragSource('todo_list_item', itemSource, collect)(TodoListItem)
);