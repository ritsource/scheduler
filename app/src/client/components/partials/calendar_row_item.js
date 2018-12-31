import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { month_name_dictionary, day_name_dictionary } from '../../utils/constant_data_dictionary';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';

const CalendarRowItem = (props) => {
  const { year, month } = props.miniCalendarState ? props.miniCalendarState : props;
  const { rowIndex, dateStamp } = props;
  
  const aDayOfThisMonth = parseInt(moment(dateStamp).format('M')) === month;
  
  const _isToday = dateStamp && month === parseInt(moment().format('M'))
    && props.date === parseInt(moment().format('D'));
  
  return (
    <React.Fragment>
      {props.miniCalendar ? (
        <div className={`calendar-row-item-000-mini ${!aDayOfThisMonth && 'calendar-row-item-000-mini-not-in-month'}`}>
          <div
            className={`${_isToday && 'calendar-row-item-mini-active-date'}`}
            onClick={() => {
              props.setReduxCalendar({ year, month });
              props.handleUrlNavigation(year, month);
            }}
          >
            <p>{props.date}</p>
          </div>
        </div>
      ) : (
        <div className='calendar-row-item-000'
          style={(props.index === 6) ? {borderRight: '0px solid white'} : {}}
        >
          {props.rowIndex === 0 && (
            <div style={{ height: '20px', marginLeft: '10px', display: 'flex', alignItems: 'flex-end' }}>
              <p className='calendar-row-item-p-002'>{day_name_dictionary[props.index]}</p>
            </div>
          )}
          {_isToday ? (
            <div className='calendar-row-item-div-001 calendar-row-item-mini-active-date'>
              <p>{props.date}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div className='calendar-row-item-div-001'>
                <p>
                  {props.date}
                </p>
              </div>
              <p className='calendar-row-item-p-002'>
                {(props.date === 1) && (
                  <React.Fragment>
                    {(props.rowIndex === 0) ? (
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

const mapStateToProps = ({ calendarMonth }) => ({ month: calendarMonth.month });

const mapDispatchToProps = (dispatch) => ({
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRowItem);