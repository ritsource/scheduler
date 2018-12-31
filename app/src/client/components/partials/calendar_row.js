import React from 'react';
import moment from 'moment';

import { funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import CalendarRowItem from './calendar_row_item';
import CalendarEventComp from './calendar_event';

let myX = 0;

class CalendarRowComp extends React.Component {
  render() {
    const { rowFirstDate, numDatesPrev, numDatesThis } = this.props;
  
    const findRowItemDate = (i) => {
      if ((rowFirstDate + i) <= 0) return ((numDatesPrev + i) + rowFirstDate);
      if ((rowFirstDate + i) > numDatesThis) return (i - (numDatesThis - rowFirstDate));
      return (rowFirstDate + i);
    }

    if (!this.props.miniCalendar) {
      const { year, month, firstDay, inFiveRows, index } = this.props;

      const _isLastRow = inFiveRows ? index === 4 : index === 5;

      let rowStartYear = year, rowEndYear = year;
      let rowStartMonth = month, rowEndMonth = month;
      
      if (index === 0 && firstDay > 0) {
        rowStartYear = funcHandleYear(year, month, false);
        rowStartMonth = funcHandleMonth(month, false);
      }
      if (_isLastRow && (numDatesThis - rowFirstDate) < 6) {
        rowEndYear = funcHandleYear(year, month, true);
        rowEndMonth = funcHandleMonth(month, true);
      }

      // console.log('moment', moment('2018-12').startOf('month').day());
      
      const rowStartMonth_str = (rowStartMonth.toString().length === 1)
        ? `${year}-0${rowStartMonth}`
        : `${year}-${rowStartMonth}`;
      const rowEndMonth_str = (rowEndMonth.toString().length === 1)
        ? `${year}-0${rowEndMonth}`
        : `${year}-${rowEndMonth}`;
        
      const startof_row_timestamp = moment(`${rowStartMonth_str}-${findRowItemDate(0)}`)
      const endof_row_timestamp = moment(`${rowEndMonth_str}-${findRowItemDate(6)}`)
      console.log(index, startof_row_timestamp.format('DD MM YYYY'));
      console.log(index, endof_row_timestamp.format('DD MM YYYY'));
      
    }
  
    let itemArr = [1, 2, 3, 4, 5, 6, 7];
  
    const miniCalendarStyle = this.props.inFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
    const calendarStyle_first = this.props.inFiveRows ? {height: 'calc((100% / 5) + 20px - 5px)'} : {height: 'calc((100% / 6) + 20px - 4px)'};
    const calendarStyle_rest = this.props.inFiveRows ? {height: 'calc(((100% - 20px) / 5) - 1px)'} : {height: 'calc(((100% - 20px) / 6) - 1px)'};
  
    return (
      <div className={this.props.miniCalendar ? 'calendar-row-000-mini' : 'calendar-row-000'}
        style={
          this.props.miniCalendar
          ? miniCalendarStyle
          : (this.props.index === 0) ? calendarStyle_first : calendarStyle_rest
        }
      >
        <React.Fragment>
          {itemArr.map((x, i) => {
            return (
              <CalendarRowItem
                key={i}
                index={i}
                rowIndex={this.props.index}
                date={findRowItemDate(i)}
                firstDay={this.props.firstDay}
                numDatesThis={numDatesThis}
                handleUrlNavigation={this.props.handleUrlNavigation}
                miniCalendar={this.props.miniCalendar}
                miniCalendarState={this.props.miniCalendarState}
              />
            );
          })}
          {this.props.events && (
            <React.Fragment>
              {/* {console.log('**************')} */}
              {this.props.events.map((event, i) => {
                // if (event.date_from > ) {
                  // console.log(event.title, myX, findRowItemDate(i));
                  // myX++;
                // }
              })}
              {/* {console.log('**************')} */}
              {/* <CalendarEventComp /> */}
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    );
  }
}


export default CalendarRowComp;