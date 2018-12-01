import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncFetchProjects } from '../actions/project_actions';

class HomePage extends Component {
  componentDidMount() {
    this.props.asyncFetchProjects();
  }
  
  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <li>{this.props.projects.map(({ title }, i) => (
          <li key={i}>{title}</li>
        ))}</li>
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => ({ projects });

const mapDispatchToProps = (dispatch) => ({
  asyncFetchProjects: () => dispatch(asyncFetchProjects())
});

const loadData = async (store) => {
  return store.dispatch(asyncFetchProjects());
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(HomePage),
  loadData
};