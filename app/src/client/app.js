import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import changeAppTheme from './helpers/change_theme';
import { asyncFetchGroups } from './actions/group_actions';
import { asyncFetchEvents } from './actions/event_actions';
import { asyncFetchUser } from './actions/auth_actions';
import { setupSideBar } from './actions/side_bar_actions';
import HeaderComp from './components/partials/header';
import LoadingPage from './components/pages/loading_page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appReady: false
    };
  }

  async componentDidMount() {
    this.props.asyncFetchUser();
    this.props.asyncFetchEvents();
    this.props.asyncFetchGroups();

    await this.props.setupSideBar();

    const name = window.localStorage.getItem('myAppTheme');
    await changeAppTheme(name);
    
    this.setState({ appReady: true });
  }

  render() {
    return (
      <div>
        {this.state.appReady ? (
          <React.Fragment>
            <HeaderComp appMode={this.props.appMode || 0} auth={this.props.auth}/>
            <div>{renderRoutes(this.props.route.routes)}</div>
          </React.Fragment>
        ) : (
          <LoadingPage.component />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, appMode }) => ({ auth, appMode });

export default {
  component: connect(
    mapStateToProps,
    { asyncFetchUser, asyncFetchGroups, asyncFetchEvents, setupSideBar }
  )(App),
  loadData: function (store) {
    store.dispatch(asyncFetchUser());
    store.dispatch(asyncFetchEvents());
    return store.dispatch(asyncFetchGroups());
  }
};


Date.prototype.getFormattedDate = function() {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
}