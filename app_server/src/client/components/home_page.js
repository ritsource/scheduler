import React from 'react';
import { connect } from 'react-redux';

import { asyncTestAction } from '../actions/test_actions';
import ListComp from './list_comp';

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.asyncTestAction();
  }

  render() {
    return (
      <div>
        HomePage
        <ListComp projects={this.props.projects}/>
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => ({ projects });

function loadData(store) {
  return store.dispatch(asyncTestAction());
}

export default {
  component: connect(mapStateToProps, { asyncTestAction })(HomePage),
  loadData
};