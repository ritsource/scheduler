import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import HeaderComp from './components/partials/header/header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar_visible: true
    }
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({ sidebar_visible: !prevState.sidebar_visible }));
  }

  render() {
    return (
      <div>
        <HeaderComp toggleSidebar={this.toggleSidebar} />
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

export default {
  component: connect(mapStateToProps)(App),
};