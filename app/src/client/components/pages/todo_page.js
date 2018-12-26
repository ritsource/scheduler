import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import ReactSVG from 'react-svg'
import { Redirect } from 'react-router-dom';

import { handleAppMode } from '../../actions/app_mode_actions';
import TodoSidebarComp from '../partials/todo_sidebar';
import TodoListComp from '../partials/todo_list';

export class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: ''
    }
  }

  changeGroupId = (groupId) => {
    this.setState({ groupId });
    const history = createBrowserHistory();
    history.push(`/todo?group=${groupId}`);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    this.setState({ groupId: urlParams.get('group') || '' });
    this.props.handleAppMode(1);
  }
  
  render() {
    const activeGroup = this.props.groups.find(({ _id }) => (_id === this.state.groupId));

    return (
      <div className='todo-page-000'>
        {this.props.auth ? (
          <React.Fragment>
            <TodoSidebarComp
              // groups={this.props.groups}
              changeGroupId={this.changeGroupId}
              active_groupId={this.state.groupId}
              visible={this.props.sideBar}
            />
            <div className='todo-page-001-content'>
              {!this.state.groupId ? (
                <h2><ReactSVG src='/logo.svg'/>Your Todos</h2>
              ) : (
                <TodoListComp
                  active_groupId={this.state.groupId}
                  // listTitle={activeGroup ? activeGroup.title : undefined}
                  activeGroup={activeGroup}
                />
              )}
            </div>
          </React.Fragment>
        ) : (
          <Redirect to='/login' />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, groups, events, sideBar }) => ({ auth, groups, events, sideBar });

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(TodoPage),
  loadData: function (store) {
    return store.dispatch(handleAppMode(1));
  }
};