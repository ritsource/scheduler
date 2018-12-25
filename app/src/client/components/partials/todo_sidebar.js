import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { asyncPostGroup } from '../../actions/group_actions';
import TodoSidebarItem from './todo_sidebar_item';

class TodoSidebarComp extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      title: ''
    }
  }

  render() {
    return (
      <div className={`todo-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        <div className='todo-sidebar-001-the-list'>
          {this.props.groups.map((group, i) => (
            <TodoSidebarItem
              key={i}
              group={group}
              active={group._id === this.props.active_groupId}
              changeGroupId={this.props.changeGroupId}
            />
          ))}
        </div>

        <form style={{ bottom: '0px' }} className='todo-list-001-new-task-form' onSubmit={(e) => {
          e.preventDefault();
          this.props.asyncPostGroup({
            title: this.state.title,
            _rank: (this.props.groups.length + 1)
          }).then(() => {
            this.setState({ title: '' });
            scrollToBottom('.todo-sidebar-001-the-list');
          });
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
  groups: groups
});

const mapDispatchToProps = (dispatch) => ({
  asyncPostGroup: (abc) => dispatch(asyncPostGroup(abc))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoSidebarComp);