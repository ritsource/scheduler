import React from 'react';

const CalendarEventComp = (props) => {
  const { event, visible } = props;
  const { startIndex, endIndex } = event;
  const widthExtra = (endIndex - startIndex);
  
  return (
    <div
      className={`calendar-event-comp-000 ${visible ? 'calendar-event-000-vis' : 'calendar-event-000-invis'}`}
      style={{
        overflowX: 'visible',
        width: `calc(${(widthExtra + 1) * 100}% - 10px - 4px)`,
        background: event.hex_color
      }}
    >
      <div className='calendar-event-div-over-title-001'>
        <p>{event.title}</p>
      </div>
    </div>
  );
}

export default CalendarEventComp;