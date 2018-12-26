import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { asyncFetchGroups } from './actions/group_actions';
import { asyncFetchEvents } from './actions/event_actions';
import { asyncFetchUser } from './actions/auth_actions';
import HeaderComp from './components/partials/header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.asyncFetchUser();
    this.props.asyncFetchEvents();
    this.props.asyncFetchGroups();
  }

  render() {
    return (
      <div>
        <HeaderComp appMode={this.props.appMode || 0} auth={this.props.auth}/>
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, appMode }) => ({ auth, appMode });

export default {
  component: connect(mapStateToProps, { asyncFetchUser, asyncFetchGroups, asyncFetchEvents })(App),
  loadData: function (store) {
    store.dispatch(asyncFetchUser());
    store.dispatch(asyncFetchEvents());
    return store.dispatch(asyncFetchGroups());
  }
};