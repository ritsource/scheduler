import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import HeaderComp from './components/partials/header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderComp appMode={this.props.appMode || 0} />
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ appMode }) => ({ appMode });

export default {
  component: connect(mapStateToProps)(App)
};