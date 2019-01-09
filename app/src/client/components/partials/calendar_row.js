import React from 'react';
import CalendarRowItem from './calendar_row_item';

const CalendarRowComp = (props) => {
  const { index, dateDistMap, dateDistMapInverse, eventDistMap, miniCalendar, miniCalendarState, handleUrlNavigation } = props;
  let itemArr = [1, 2, 3, 4, 5, 6, 7];

  const miniCalendarStyle = props.isFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
  const calendarStyle_first = props.isFiveRows
    ? {height: 'calc((100% / 5) + 20px - 5px)'}
    : {height: 'calc((100% / 6) + 20px - 4px)'};
  const calendarStyle_rest = props.isFiveRows
    ? {height: 'calc(((100% - 20px) / 5) - 1px)'}
    : {height: 'calc(((100% - 20px) / 6) - 1px)'};

  return (
    <div className={miniCalendar ? 'calendar-row-000-mini' : 'calendar-row-000'}
      style={miniCalendar ? miniCalendarStyle : (index === 0) ? calendarStyle_first : calendarStyle_rest}
    >
      {itemArr.map((x, i) => {
        const dateStamp = dateDistMap[i + (index * 7)];       
        
        return (
          <CalendarRowItem
            key={i}
            index={i}
            rowIndex={index} // Index of the Parent Row
            date={new Date(dateStamp).getDate() || 0} // Date
            dateStamp={dateStamp} // Date Timestamp
            dateDistMap={dateDistMap} // { dateDistMap } from Props
            dateDistMapInverse={dateDistMapInverse} // { dateDistMap } from Props
            eventDistMap={eventDistMap} // { dateDistMap } from Props
            handleUrlNavigation={handleUrlNavigation} // { handleUrlNavigation } from Props
            miniCalendar={miniCalendar} // { miniCalendar } from Props
            miniCalendarState={miniCalendarState} // { miniCalendarState } from Props
          />
        );
      })}
    </div>
  );
}

export default CalendarRowComp;