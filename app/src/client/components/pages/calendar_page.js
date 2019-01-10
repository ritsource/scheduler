import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import { handleAppMode } from '../../actions/app_mode_actions';
import CalendarSidebarComp from '../partials/calendar_sidebar';
import CalendarContentComp from '../partials/calendar_content';

export class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.handleAppMode(0);
  }

  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      this.props.setReduxCalendar({ year: staticContext.year, month: staticContext.month });
    } else if (window) {
      const urlParams = new URLSearchParams(window.location.search);
      this.props.setReduxCalendar({
        year: parseInt(urlParams.get('year')) || new Date().getFullYear(),
        month: parseInt(urlParams.get('month')) || new Date().getMonth(),
      });
    }
  }
  
  render() {
    return (
      <div className='calendar-page-000'>
        {this.props.auth ? (
          <React.Fragment>
            <CalendarSidebarComp
              visible={this.props.sideBar}
            />
            <CalendarContentComp staticContext={this.props.staticContext}/>
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
  handleAppMode: (x) => dispatch(handleAppMode(x)),
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(CalendarPage),
  loadData: (store, context) => {
    store.dispatch(handleAppMode(0))
    store.dispatch({
      type: SET_CALENDAR_MONTH_STATE, year: context.year, month: context.month
    });
  }
};