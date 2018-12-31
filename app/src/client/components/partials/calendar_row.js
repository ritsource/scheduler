import React from 'react';
import moment from 'moment';

import { funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import CalendarRowItem from './calendar_row_item';
import CalendarEventComp from './calendar_event';

let myX = 0;

class CalendarRowComp extends React.Component {
  render() {
    let itemArr = [1, 2, 3, 4, 5, 6, 7];
  
    const miniCalendarStyle = this.props.isFiveRows ? {height: 'calc(100% / 5)'} : {height: 'calc(100% / 6)'};
    const calendarStyle_first = this.props.isFiveRows
      ? {height: 'calc((100% / 5) + 20px - 5px)'}
      : {height: 'calc((100% / 6) + 20px - 4px)'};
    const calendarStyle_rest = this.props.isFiveRows
      ? {height: 'calc(((100% - 20px) / 5) - 1px)'}
      : {height: 'calc(((100% - 20px) / 6) - 1px)'};
  
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
            const dateStamp = this.props.date_distribution_map[i + (this.props.index * 7)];

            return (
              <CalendarRowItem
                key={i}
                index={i}
                rowIndex={this.props.index}
                date={parseInt(moment(dateStamp).format('DD'))}
                dateStamp={dateStamp}
                handleUrlNavigation={this.props.handleUrlNavigation}
                miniCalendar={this.props.miniCalendar}
                miniCalendarState={this.props.miniCalendarState}
                // start_events={row_events.filter((event) => {
                  
                // })}
                // end_events={}
              />
            );
          })}
          {/* {(
            this.props.events
            && !this.props.miniCalendar
            && startof_row_moment
            && endof_row_moment
          ) && (
            <div
              style={(this.props.index === 0) ? {
                paddingTop: '55px'
              } : {
                paddingTop: '35px',
                height: `calc(100% - 35px)`
              }}
              className='calendar-row-events-level-001'
            >
              {this.props.events.map((event, i) => {
                if (
                  event.date_from > startof_row_moment
                  || event.date_to > endof_row_moment
                ) {
                  return (
                    <CalendarEventComp
                      key={i}
                      event={event}
                      rowFirstDate={this.rowFirstDate}
                    />
                  );
                }
              })}
            </div>
          )} */}
        </React.Fragment>
      </div>
    );
  }
}


export default CalendarRowComp;