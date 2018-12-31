import React from 'react';
import moment from 'moment';

const CalendarEventComp = (props) => {
  const { event, rowFirstDate } = props;

  return (
    <div
      className='calendar-event-comp-000'
      style={{
        left: '100px',
        // left: `calc(100% / ${rowFirstDate - parseInt(moment(event.date_from).format('DD')) * 7})`
      }}
    >
      <p>{event.title}</p>
    </div>
  );
}

export default CalendarEventComp;