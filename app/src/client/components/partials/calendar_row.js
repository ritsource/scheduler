import React from 'react';

import CalendarRowItem from './calendar_row_item';

class CalendarRowComp extends React.Component {
  constructor(props) {
    super(props);
  }

  findRowItemDate = (i) => {
    const { rowFirstDate, numDatesPrev, numDatesThis } = this.props;

    if ((rowFirstDate + i) <= 0) return ((numDatesPrev + i) + rowFirstDate);
    
    if ((rowFirstDate + i) > numDatesThis) return (i - (numDatesThis - rowFirstDate));

    return (rowFirstDate + i);
  }
  
  render() {
    const { rowFirstDate, numDatesPrev, numDatesThis } = this.props;
    let itemArr = [1, 2, 3, 4, 5, 6, 7];

    const miniCalendarStyle = this.props.inFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
    const calendarStyle = this.props.inFiveRows ? {height: 'calc((100% / 5) - 1px)'} : {height: 'calc((100% / 6) - 1px)'};

    return (
      <div
        className={this.props.miniCalendar ? 'calendar-row-000-mini' : 'calendar-row-000'}
        style={this.props.miniCalendar ? miniCalendarStyle : calendarStyle}
      >
        {itemArr.map((x, i) => {
          return (
            <CalendarRowItem
              key={i}
              index={i}
              rowIndex={this.props.index}
              date={this.findRowItemDate(i)}
              firstDay={this.props.firstDay}
              numDatesThis={numDatesThis}
              miniCalendar={this.props.miniCalendar}
            />
          );
        })}
      </div>
    );
  }
}

export default CalendarRowComp;