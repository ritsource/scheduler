import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { month_name_dictionary, day_name_dictionary } from '../../utils/constant_data_dictionary';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarEventComp from './calendar_event';

const CalendarRowItem = (props) => {
  const { year, month } = props.miniCalendarState ? props.miniCalendarState : props;
  const { index, rowIndex, dateStamp, firstDay, dateDistMap, dateDistMapInverse, eventDistMap } = props;
  
  const itemIndex = (rowIndex * 7) + index;
  // console.log(`eventDistMap[${itemIndex}]`, eventDistMap[itemIndex]);
  
  const aDayOfThisMonth = parseInt(moment(dateStamp).format('M')) === month;
  
  const _isToday = dateStamp && aDayOfThisMonth && month === parseInt(moment().format('M'))
    && props.date === parseInt(moment().format('D'));
  
  return (
    <React.Fragment>
      {props.miniCalendar ? (
        <div className={`calendar-row-item-000-mini ${!aDayOfThisMonth && 'calendar-row-item-000-mini-not-in-month'}`}>
          <div className={`${_isToday && 'calendar-row-item-mini-active-date'}`} onClick={() => {
            props.setReduxCalendar({ year, month });
            props.handleUrlNavigation(year, month);
          }}><p>{props.date}</p></div>
        </div>
      ) : (
        <div className='calendar-row-item-000'
          style={(props.index === 6) ? {borderRight: '0px solid white'} : {}}
        >
          <React.Fragment>
            {rowIndex === 0 && (
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
                  <p>{props.date}</p>
                </div>
              </div>
            )}
            {!props.miniCalendar && (
              <div className='calendar-row-item-events-level'
                style={
                  (rowIndex === 0) ? {
                    marginTop: '5px', height: `calc(100% - 55px)`, width: 'calc(100% / 7)'
                  } : {
                    marginTop: '5px', height: `calc(100% - 35px)`, width: 'calc(100% / 7)'
                  }
                }
              >
                {/* const { rowIndex, dateStamp, dateDistMap, dateDistMapInverse, eventDistMap } = props;  */}
                {eventDistMap[itemIndex] && eventDistMap[itemIndex].map((event, i) => {
                  if (event === false) {
                    return (<div key={i} className='calendar-row-item-empty-event'></div>);
                  } else if (event === null) {
                    return (<div key={i} className='calendar-row-item-empty-event'></div>);
                  } else if (event) {
                    return (
                      <CalendarEventComp
                        key={i}
                        event={event}
                      />
                    )
                  }
                })}
              </div>
            )}
          </React.Fragment>
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