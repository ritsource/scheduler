import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAppMode } from '../../actions/app_mode_actions';
import CalendarSidebarComp from '../partials/calendar_sidebar';
import CalendarContentComp from '../partials/calendar_content';

export class CalendarPage extends React.Component {
  componentDidMount() {
    this.props.handleAppMode(0);
  }
  
  render() {
    return (
      <div className='calendar-page-000'>
        {this.props.auth ? (
          <React.Fragment>
            <CalendarSidebarComp
              visible={this.props.sideBar}
            />
            <CalendarContentComp

            />
          </React.Fragment>
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