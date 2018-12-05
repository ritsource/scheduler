import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

import HeaderComp from './components/partials/header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderComp appMode={0} />
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

export default {
  component: App
};