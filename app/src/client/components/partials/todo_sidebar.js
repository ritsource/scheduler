import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncFetchGroups, asyncPostGroup, asyncRearrangeGroups, rearrangeReduxGroups } from '../../actions/group_actions';
import TodoSidebarItem from './todo_sidebar_item';

class TodoSidebarComp extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      title: ''
    }
  }

  onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    this.props.rearrangeReduxGroups({
      fromIndex: result.source.index,
      toIndex: result.destination.index
    });

    const movedGroups = (result.source.index < result.destination.index)
      ? Object.values(this.group_rank_map)
        .slice(result.source.index + 1, result.destination.index + 1)
        .map(({ _id }) => _id)
      : Object.values(this.group_rank_map)
        .slice(result.destination.index, result.source.index)
        .map(({ _id }) => _id);

    this.props.asyncRearrangeGroups({
      focusedGroup: result.draggableId,
      fromRank: this.group_rank_map[result.source.index]._rank,
      toRank: this.group_rank_map[result.destination.index]._rank,
      movedGroups: movedGroups
    });
  }

  group_rank_map = {}

  componentDidMount() {
    this.props.asyncFetchGroups();
  }

  render() {
    return (
      <div className={`todo-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        <DragDropContext onDragEnd={this.onDragEnd} >
          <Droppable droppableId='droppableId-sidebar' type='GROUP_DND'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='todo-sidebar-001-the-list'
              >
                {this.props.groups.map((group, i) => {
                  this.group_rank_map[i] = { _rank: group._rank, _id: group._id };

                  return (
                    <TodoSidebarItem
                      key={i}
                      index={i}
                      group={group}
                      active={group._id === this.props.active_groupId}
                      changeGroupId={this.props.changeGroupId}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <form style={{ bottom: '0px' }} className='any-list-comp-bottom-form-999' onSubmit={async (e) => {
          e.preventDefault();
          await this.props.asyncPostGroup({ title: this.state.title, _rank: (this.props.groups.length + 1) });
          this.setState({ title: '' });
          scrollToBottom('.todo-sidebar-001-the-list');
        }}>
          <input
            name='title'
            autoComplete='off'
            placeholder='+ New Group'
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
          {this.state.title !== '' && (
            <button type='submit'>Add</button>
          )}
        </form>
      </div>
    );
  }
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