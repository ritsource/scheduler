import React from 'react';

import { month_name_dictionary } from '../../../utils/constants';

const CalendarSidebarNavigator = (props) => (
  <div className='calendar-sidebar-navigation-000'>
    <p>{month_name_dictionary[props.miniCalendarState.month]}&nbsp;{props.miniCalendarState.year}</p>
    <div>
      <button name='Navigate to Previous Month' 
        style={{ marginRight: '2px' }}
        className='sidebar-navigation-001-nav-btn'
        onClick={() => {
          props.handleNavigation(false);
        }}
      >{'<'}</button>
      <button name='Navigate to Next Month'
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