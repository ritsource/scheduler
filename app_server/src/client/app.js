import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import { asyncFetchProjects } from './actions/project_actions';
import { asyncFetchTexts } from './actions/text_actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visHambRodal: false
    }
  }

  render() {
    return (
      <div>
        <h3>Header</h3>
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects
});

const loadData = async (store) => {
  await store.dispatch(asyncFetchTexts());
  return store.dispatch(asyncFetchProjects());
}

export default {
  component: connect(mapStateToProps, { asyncFetchProjects, asyncFetchTexts })(App),
  loadData: loadData
};