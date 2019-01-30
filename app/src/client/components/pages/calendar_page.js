import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import { handleAppMode } from '../../actions/app_mode_actions';

import CalendarSidebarComp from '../partials/calendar/calendar_sidebar';
import CalendarContentComp from '../partials/calendar/calendar_content';
import EventDetailsComp from '../reusables/event_details/event_details';

export const CalendarPage = (props) => {
  const [ activeEvent, setActiveEvent ] = useState(null);

  useEffect(() => {
    props.handleAppMode(0);
    return () => props.handleAppMode(2);
  }, []);

  const toggleEventDetails = (event) => setActiveEvent(event);

  return (
    <div className='calendar-page-000'>
      {props.auth ? (
        <React.Fragment>
          <CalendarSidebarComp visible={props.sideBar}/>
          <CalendarContentComp
            staticContext={props.staticContext}
            toggleEventDetails={toggleEventDetails}
          />
          {activeEvent && (
            <EventDetailsComp
              event={activeEvent}
              hex_color={activeEvent.hex_color}
              closeEventDetails={() => toggleEventDetails(null)}
            />
          )}
        </React.Fragment>
      ) : (
        <Redirect to='/login' />
      )}
    </div>
  );

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
