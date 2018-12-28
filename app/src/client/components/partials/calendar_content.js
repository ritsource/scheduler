import React from 'react';
import moment from 'moment';

import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // }
  }

  componentWillReceiveProps()  {

  }

  render() {
    return (
      <div className='calendar-content-000'>
        <CalendarRowComp />
      </div>
    );
  }
}

export default CalendarContentComp;