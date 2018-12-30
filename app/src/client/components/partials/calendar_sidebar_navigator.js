import React from 'react';

import { month_name_dictionary } from '../../utils/constant_data_dictionary';

// miniCalendarState={this.state}
//           handleNavigation={this.handleNavigation}
//           navigateToNow={this.navigateToNow}

const CalendarSidebarNavigator = (props) => (
  <div className='calendar-sidebar-navigation-000'>
    <p>{month_name_dictionary[props.miniCalendarState.month - 1]}&nbsp;{props.miniCalendarState.year}</p>
  
    {/* <button onClick={props.navigateToNow}>Today</button> */}

    <div>
      <button
        style={{ marginRight: '2px' }}
        className='sidebar-navigation-001-nav-btn'
        onClick={() => {
          props.handleNavigation(false);
        }}
      >{'<'}</button>
      <button
        className='sidebar-navigation-001-nav-btn'
        style={{ marginLeft: '2px' }}
        onClick={() => {
          props.handleNavigation(true);
        }}
      >{'>'}</button>
    </div>
  </div>
);

export default CalendarSidebarNavigator;