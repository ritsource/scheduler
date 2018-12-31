import React from 'react';
import moment from 'moment';

import { funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import CalendarRowItem from './calendar_row_item';
import CalendarEventComp from './calendar_event';

let myX = 0;

class CalendarRowComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startof_row_moment: null,
      endof_row_moment: null
    }
  }
  
  findRowItemDate = (i) => {
    const { rowFirstDate, numDatesPrev, numDatesThis } = this.props;
    
    if ((rowFirstDate + i) <= 0) return ((numDatesPrev + i) + rowFirstDate);
    if ((rowFirstDate + i) > numDatesThis) return (i - (numDatesThis - rowFirstDate));
    return (rowFirstDate + i);
  }

  async componentWillReceiveProps(nextProps) {
    const { year, month, firstDay, isFiveRows, rowFirstDate, numDatesThis, index } = nextProps;

      const _isLastRow = isFiveRows ? index === 4 : index === 5;

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

      const formatStringForMoment = (year, month, date) => {
        const myMonth = (month.toString().length === 1) ? `0${month}` : `${month}`;
        const myDate = (date.toString().length === 1) ? `0${date}` : `${date}`;
        return `${year}-${myMonth}-${myDate}`;
      }

      // const startof_row_moment = moment(
      //   formatStringForMoment(rowStartYear, rowStartMonth, this.findRowItemDate(0))
      // );
      // const endof_row_moment = moment(
      //   formatStringForMoment(rowEndYear, rowEndMonth, this.findRowItemDate(6))
      // );

      await this.setState({
        startof_row_moment: moment(
          formatStringForMoment(rowStartYear, rowStartMonth, this.findRowItemDate(0))
        ).startOf('day'),
        endof_row_moment: moment(
          formatStringForMoment(rowEndYear, rowEndMonth, this.findRowItemDate(6))
        ).startOf('day')
      });

      // console.log(index, startof_row_moment.format('DD MM YYYY'));
      // console.log(index, endof_row_moment.format('DD MM YYYY'));
      // startof_row_moment endof_row_moment
      // const bool = endof_row_moment.isAfter(moment().format('YYYY-MM-DD'), 'day');
      // console.log(this.state.startof_row_moment);
  }

  componentDidMount() {
    window.moment = moment;
  }


  render() {
    const { startof_row_moment, endof_row_moment } = this.state;

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
            return (
              <CalendarRowItem
                key={i}
                index={i}
                rowIndex={this.props.index}
                date={this.findRowItemDate(i)}
                firstDay={this.props.firstDay}
                numDatesThis={this.props.numDatesThis}
                handleUrlNavigation={this.props.handleUrlNavigation}
                miniCalendar={this.props.miniCalendar}
                miniCalendarState={this.props.miniCalendarState}
              />
            );
          })}
          {(
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
              {/* {console.log('**************')} */}
              {this.props.events.map((event, i) => {
                if (
                  event.date_from > startof_row_moment
                  || event.date_to > endof_row_moment
                ) {
                  // console.log(event.title, myX, this.findRowItemDate(i));
                  // myX++;
                  return (
                    <CalendarEventComp
                      key={i}
                      event={event}
                      rowFirstDate={this.rowFirstDate}
                    />
                  );
                }
              })}
              {/* {console.log('**************')} */}
              {/* <CalendarEventComp /> */}
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}


export default CalendarRowComp;