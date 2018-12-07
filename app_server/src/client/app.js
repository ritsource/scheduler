import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { asyncFetchGroups } from './actions/group_actions';
import { asyncFetchEvents } from './actions/event_actions';
import HeaderComp from './components/partials/header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.asyncFetchGroups();
  }

  render() {
    return (
      <div>
        <DragDropContextProvider backend={HTML5Backend}>
          <HeaderComp appMode={this.props.appMode || 0} />
          <div>{renderRoutes(this.props.route.routes)}</div>
        </DragDropContextProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ appMode }) => ({ appMode });

export default {
  component: connect(mapStateToProps, { asyncFetchGroups, asyncFetchEvents })(App),
  loadData: function (store) {
    store.dispatch(asyncFetchEvents());
    return store.dispatch(asyncFetchGroups());
  }
};