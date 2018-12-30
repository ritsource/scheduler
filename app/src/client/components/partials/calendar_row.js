import React from 'react';

import CalendarRowItem from './calendar_row_item';

const CalendarRowComp = (props) => {
  const { rowFirstDate, numDatesPrev, numDatesThis } = props;

  const findRowItemDate = (i) => {
    if ((rowFirstDate + i) <= 0) return ((numDatesPrev + i) + rowFirstDate);    
    if ((rowFirstDate + i) > numDatesThis) return (i - (numDatesThis - rowFirstDate));
    return (rowFirstDate + i);
  }

  let itemArr = [1, 2, 3, 4, 5, 6, 7];

  const miniCalendarStyle = props.inFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
  const calendarStyle_first = props.inFiveRows ? {height: 'calc((100% / 5) + 20px - 5px)'} : {height: 'calc((100% / 6) + 20px - 4px)'};
  const calendarStyle_rest = props.inFiveRows ? {height: 'calc(((100% - 20px) / 5) - 1px)'} : {height: 'calc(((100% - 20px) / 6) - 1px)'};

  return (
    <div className={props.miniCalendar ? 'calendar-row-000-mini' : 'calendar-row-000'}
      style={props.miniCalendar ? miniCalendarStyle : (props.index === 0) ? calendarStyle_first : calendarStyle_rest}
    >
      {itemArr.map((x, i) => {
        return (
          <CalendarRowItem
            key={i}
            index={i}
            rowIndex={props.index}
            date={findRowItemDate(i)}
            firstDay={props.firstDay}
            numDatesThis={numDatesThis}
            handleUrlNavigation={props.handleUrlNavigation}
            miniCalendar={props.miniCalendar}
            miniCalendarState={props.miniCalendarState}
          />
        );
      })}
    </div>
  );
}

export default CalendarRowComp;