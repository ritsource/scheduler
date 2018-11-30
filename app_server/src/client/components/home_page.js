import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncFetchProjects } from '../actions/project_actions';

class HomePage extends Component {
  componentDidMount() {
    // this.props.asyncFetchProjects();
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

export default {
  component: connect(mapStateToProps, { asyncFetchProjects })(HomePage)
};