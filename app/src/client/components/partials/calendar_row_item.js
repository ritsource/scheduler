import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { month_name_dictionary } from '../../utils/month_name_dictionary';

class CalendarRowItem extends React.Component {
  render() {
    const { year, month } = this.props.miniCalendarState ? this.props.miniCalendarState : this.props;

    const { firstDay, numDatesThis, rowIndex } = this.props;
    const boxIndex = (7 * rowIndex) + this.props.index;
    const aDayOfThisMonth = firstDay <= boxIndex && boxIndex <= (firstDay + numDatesThis  - 1);
    const _isToday = aDayOfThisMonth
      && month === parseInt(moment().format('M'))
      && this.props.date === parseInt(moment().format('D'));
    
    const dayNameArr = [
      // 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
    ]
    
    return (
      <React.Fragment>
        {this.props.miniCalendar ? (
          <div className={`calendar-row-item-000-mini ${!aDayOfThisMonth && 'calendar-row-item-000-mini-not-in-month'}`}>
            <div className={`${_isToday && 'calendar-row-item-mini-active-date'}`}>
              <p>{this.props.date}</p>
            </div>
          </div>
        ) : (
          <div className='calendar-row-item-000'
            style={(this.props.index === 6) ? {borderRight: '0px solid white'} : {}}
          >
            {this.props.rowIndex === 0 && (
              <div style={{ height: '20px', marginLeft: '10px', display: 'flex', alignItems: 'flex-end' }}>
                <p className='calendar-row-item-p-002'>{dayNameArr[this.props.index]}</p>
              </div>
            )}
            {_isToday ? (
              <div className='calendar-row-item-div-001 calendar-row-item-mini-active-date'>
                <p>{this.props.date}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='calendar-row-item-div-001'>
                  <p>
                    {this.props.date}
                  </p>
                </div>
                <p className='calendar-row-item-p-002'>
                  {(this.props.date === 1) && (
                    <React.Fragment>
                      {(this.props.rowIndex === 0) ? (
                        <span>{month_name_dictionary[month - 1].slice(0, 3).toUpperCase()}</span>
                      ) : (
                        <span>{month_name_dictionary[(month === 12) ? 0 : month].slice(0, 3).toUpperCase()}</span>
                      )}
                    </React.Fragment>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ calendarMonth }) => ({ month: calendarMonth.month });

export default connect(mapStateToProps)(CalendarRowItem);