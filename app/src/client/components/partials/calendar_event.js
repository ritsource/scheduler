import React from 'react';

const CalendarEventComp = (props) => {
  return (
    <div className='calendar-event-comp-000'>
      <p>{props.event.title}</p>
    </div>
  );
}

export default CalendarEventComp;