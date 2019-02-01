import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

import { asyncFetchGroups, asyncPostGroup, asyncRearrangeGroups, rearrangeReduxGroups } from '../../../actions/group_actions';
import TodoSidebarItem from './todo_sidebar_item';

export const TodoSidebarComp = (props) => {
  const [ title, setTitle ] = useState('');
  const [ groups, setGroups ] = useState(props.groups);

  useEffect(() => {
    if (!_.isEqual(groups, props.groups)) setGroups(props.groups);
  });

  const onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    const tempGroup = [ ...groups ];

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    props.rearrangeReduxGroups({ fromIndex, toIndex });

    const movedGroups = (fromIndex < toIndex)
      ? tempGroup.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
      : tempGroup.slice(toIndex, fromIndex).map(({ _id }) => _id);

    props.asyncRearrangeGroups({
      focusedGroup: result.draggableId,
      fromRank: tempGroup[fromIndex]._rank,
      toRank: tempGroup[toIndex]._rank,
      movedGroups: movedGroups
    });
  }

  return (
    <div className={`todo-sidebar-000 ${!props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId='droppableId-sidebar' type='GROUP_DND'>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='todo-sidebar-001-the-list'
            >
              {groups.map((group, i) => {
                return (
                  <TodoSidebarItem
                    key={i}
                    index={i}
                    group={group}
                    active={group._id === props.active_groupId}
                    changeGroupId={props.changeGroupId}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <form style={{ bottom: '0px' }} className='any-list-comp-bottom-form-999' onSubmit={async (e) => {
        e.preventDefault();
        await props.asyncPostGroup({ title: title });
        setTitle('');
        scrollToBottom('.todo-sidebar-001-the-list');
      }}>
        <input
          name='title'
          autoComplete='off'
          placeholder='+ New Group'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title !== '' && (
          <button name='Add a new Group'
            className='any-list-comp-form-submit-btn-003'
            type='submit'
          >Add</button>
        )}
      </form>
    </div>
  );
}

const mapStateToProps = ({ groups }) => ({
  groups: groups.sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncFetchGroups: (abc) => dispatch(asyncFetchGroups(abc)),
  asyncPostGroup: (abc) => dispatch(asyncPostGroup(abc)),
  asyncRearrangeGroups: (abc) => dispatch(asyncRearrangeGroups(abc)),
  rearrangeReduxGroups: (abc) => dispatch(rearrangeReduxGroups(abc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoSidebarComp);