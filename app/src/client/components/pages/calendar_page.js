import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAppMode } from '../../actions/app_mode_actions';

export class CalendarPage extends React.Component {
  componentDidMount() {
    this.props.handleAppMode(0);
  }
  
  render() {
    return (
      <div>
        {this.props.auth ? (
          <p>CalendarPage</p>
        ) : (
          <Redirect to='/login' />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, groups, events, sideBar }) => ({ auth, groups, events, sideBar });

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(CalendarPage),
  loadData: (store) => store.dispatch(handleAppMode(0))
};