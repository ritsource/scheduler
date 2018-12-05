import React from 'react';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';
import { asyncFetchGroups } from '../../actions/group_actions';
import TodoSidebarComp from '../partials/todo_sidebar';

export class TodoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.handleAppMode(1);
    this.props.asyncFetchGroups();
  }
  
  render() {
    return (
      <div>
        {this.props.sideBar && (
          <TodoSidebarComp groups={this.props.groups} />
        )}
        TodoPage
      </div>
    );
  }
}

const mapStateToProps = ({ groups, sideBar }) => ({ groups, sideBar });

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x)),
  asyncFetchGroups: () => dispatch(asyncFetchGroups())
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(TodoPage),
  loadData: function (store) {
    store.dispatch(handleAppMode(1));
    return store.dispatch(asyncFetchGroups());
  }
};