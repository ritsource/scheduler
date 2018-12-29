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

    return (
      <React.Fragment>
        {this.props.miniCalendar ? (
          <div
            className='calendar-row-000-mini'
            style={this.props.inFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'}}
          >
            {itemArr.map((x, i) => {
              return (
                <CalendarRowItem
                  key={i}
                  index={i}
                  rowIndex={this.props.index}
                  date={this.findRowItemDate(i)}
                  miniCalendar={this.props.miniCalendar}
                  firstDay={this.props.firstDay}
                  numDatesThis={numDatesThis}
                />
              );
            })}
          </div>
        ) : (
          <div
            className='calendar-row-000'
            style={this.props.inFiveRows ? {height: 'calc((100% / 5) - 1px)'} : {height: 'calc((100% / 6) - 1px)'}}
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
                />
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CalendarRowComp;