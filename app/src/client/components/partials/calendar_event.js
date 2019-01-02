import React from 'react';
import moment from 'moment';

const CalendarEventComp = (props) => {
  const { event, visible } = props;

  return (
    <div
      className={`calendar-event-comp-000 ${visible ? 'calendar-event-000-vis' : 'calendar-event-000-invis'}`}
      style={{
        overflowX: 'visible',
        width: props.width
      }}
    >
      {/* {event.client_isVisible && ( */}
        <p>{event.title}</p>
      {/* )} */}
    </div>
  );
}

export default CalendarEventComp;