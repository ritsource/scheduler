import React from 'react';
import { connect } from 'react-redux';

import { handleAppMode } from '../../actions/app_mode_actions';

export class CalendarPage extends React.Component {
  componentDidMount() {
    this.props.handleAppMode(0);
  }
  
  render() {
    return (
      <div>
        CalendarPage
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
  component: connect(null, mapDispatchToProps)(CalendarPage),
  loadData: (store) => store.dispatch(handleAppMode(0))
};