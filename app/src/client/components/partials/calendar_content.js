import React from 'react';
import moment from 'moment';

import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  render() {
    return (
      <div className='calendar-content-000'>
        <CalendarRowComp />
      </div>
    );
  }
}

export default CalendarContentComp;