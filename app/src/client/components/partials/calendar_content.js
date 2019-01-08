import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import moment from 'moment';
import _ from 'lodash';

import { generateMomentMonth, formatISOStringForMoment, funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: 0,
      dateDistMap: {},
      dateDistMapInverse: {},
      eventDistMap: {}
    };
  }

  handleUrlNavigation = (year, month) => {
    const history = createBrowserHistory();
    history.push(`/calendar?year=${year}&month=${month}`);
  }

  updateEventDistribution = async () => {
    const eventDistMap = {};
    const { dateDistMapInverse, dateDistMap } = this.state;
    const { events } = this.props;

    if (events) {
      // Filter event's that are only from 3 current months - This, Prev, Next
      const myEvents = events.filter(({ date_from, date_to }) => {
        return (
          moment(date_from).isSameOrAfter(dateDistMap[0], 'day') && moment(date_to).isSameOrBefore(dateDistMap[41], 'day')
          || moment(date_to).isSameOrAfter(dateDistMap[0], 'day') && moment(date_to).isSameOrBefore(dateDistMap[41], 'day')
        );
      });
  
      // Map over myEvents to build a Event-map
      await myEvents.map((event) => {
        // Event start and end timestamp
        const eventStart = moment(event.date_from).startOf('day').valueOf();
        const eventEnd = moment(event.date_to).startOf('day').valueOf();
  
        // Event start and end index (index on calendar => 0-to-41)
        const startIndex = dateDistMapInverse[eventStart];
        const endIndex = dateDistMapInverse[eventEnd];
        
        // Setting startIndex & endIndex on the event object
        event.startIndex = startIndex;
        event.endIndex = endIndex;

        // tempLength => records length of calendar-index (only where startIndex matches)
        let tempLength;
        if (Array.isArray(eventDistMap[startIndex])) {
          tempLength = eventDistMap[startIndex].length;

          // setDone => saves from adding two same eventObj
          let setDone = false;
          // loop over elements of calendar-index (only where startIndex matches)
          for (let f = 0; f < eventDistMap[startIndex].length; f++) {
            // if some spot is { null } it sets the new event there
            if (eventDistMap[startIndex][f] === null) {
              eventDistMap[startIndex][f] = event;
              setDone = true;
              break;
            }
          }
          // if no { null } element then concat the eventObj 
          if (!setDone) eventDistMap[startIndex] = [ ...eventDistMap[startIndex], event ];
        } else {
          // If the value on eventDistMap is not an array
          tempLength = 0;
          eventDistMap[startIndex] = [ event ];
        }
  
        // For loop that iretates between { startIndex + 1 } and { endIndex } & sets the value to { false }
        for (let k = (startIndex + 1); k <= endIndex; k++) {
          // To ignore the null spaces
          for (let g = 0; g < tempLength; g++) {
            if (Array.isArray(eventDistMap[k])) {
              if (eventDistMap[k][g] !== false) eventDistMap[k][g] = null;
            } else {
              eventDistMap[k] = [ null ];
            }
          }

          // If finds all { false } on the loop, concat { false }
          // But if Calendar-index is start of row add rest of the same event to it
          if (k % 7 === 0) {            
            const tempEvent = { ...event };
            tempEvent.startIndex = k;
            tempEvent.endIndex = endIndex;

            eventDistMap[k] = Array.isArray(eventDistMap[k])
              ? [ ...eventDistMap[k], tempEvent ]
              : [ tempEvent ];
          } else {
            eventDistMap[k] = Array.isArray(eventDistMap[k])
              ? [ ...eventDistMap[k], false ]
              : [ false ];
          }
        }
      });
  
      await this.setState({ eventDistMap });
    }
  }

  updateDateDistribution = async (year, month, firstDay) => {
    const { dateDistMap, dateDistMapInverse } = this.state;
    const numDatesThis = parseInt(generateMomentMonth(year, month).endOf('month').format('D'));

    const mapBuilder = (k, value) => {
      if (dateDistMap[k] !== value) {
        dateDistMap[k] = value;
        dateDistMapInverse[moment(value).startOf('day').valueOf()] = k;
      }
    };

    for (let k = 0; k < 42; k++) {
      if (k < firstDay) {
        const value = moment(formatISOStringForMoment(year, month, 1)).subtract(firstDay - k, 'days').valueOf();
        mapBuilder(k, value);
      } else if (k >= firstDay + numDatesThis) {
        const value = moment(formatISOStringForMoment(year, month, numDatesThis)).add((k + 1) - (firstDay + numDatesThis), 'days').valueOf();
        mapBuilder(k, value);
      } else {
        const value = moment(formatISOStringForMoment(year, month, (k - firstDay + 1))).valueOf();
        mapBuilder(k, value);
      }
    }
    
    await this.setState({ dateDistMap, dateDistMapInverse });
  }

  async componentWillReceiveProps(nextProps) {
    const { year, month } = nextProps.miniCalendarState ? nextProps.miniCalendarState : nextProps;
    const { firstDay } = this.state;

    const temp_first_day = generateMomentMonth(year, month).startOf('month').day();
    if (temp_first_day !== firstDay) await this.setState({ firstDay: temp_first_day });

    await this.updateDateDistribution(year, month, temp_first_day);
    await this.updateEventDistribution();
  }

  async componentDidMount() {
    const { year, month } = this.props.miniCalendarState ? this.props.miniCalendarState : this.props;

    const urlParams = new URLSearchParams(window.location.search);
    await this.props.setReduxCalendar({
      year: parseInt(urlParams.get('year')) || parseInt(moment().format('YYYY')),
      month: parseInt(urlParams.get('month')) || parseInt(moment().format('M')),
    });
    // const history = createBrowserHistory();
    // history.push(`/calendar?year=${year}&month=${month}`);

    if (this.state.firstDay === 0) {
      await this.setState({
        firstDay: generateMomentMonth(year, month).startOf('month').day()
      });
    }
  }

  render() {
    const tempProps = this.props.miniCalendarState ? this.props.miniCalendarState : this.props;
    const { year, month } = tempProps; 

    const monthNow = generateMomentMonth(year, month);
    const numDatesThis = parseInt(monthNow.endOf('month').format('D'));
    const numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));
    const numDatesNext = parseInt(monthNow.add(2, 'month').endOf('month').format('D')); // Cause these functions changes the object
    
    const isFiveRows = (this.state.firstDay + numDatesThis) <= 35;
    let rowArr;
    if (isFiveRows) rowArr = [1, 2, 3, 4, 5];
    else rowArr = [1, 2, 3, 4, 5, 6];

    // console.log('eventDistMap', this.state.eventDistMap);
    
    
    return (
      <div className={this.props.miniCalendar ? 'calendar-content-000-mini' : 'calendar-content-000'}>
        {rowArr.map((x, i) => {
          return (
            <CalendarRowComp
              key={i}
              index={i}
              numDatesPrev={numDatesPrev} // Number of days in the Previous Month
              numDatesThis={numDatesThis} // Number of days in the This Month
              year={year} // { year } from Redux State
              month={month} // { month } from Redux State
              // rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.firstDay)} // First Date of The Row
              isFiveRows={isFiveRows} // if a 5-row-month { true } else { flase }
              // firstDay={this.state.firstDay} // First Day Of Month's Index in row-1
              handleUrlNavigation={this.handleUrlNavigation} // Function for Month Navigation + URL
              dateDistMap={this.state.dateDistMap} // { dateDistMap } from Component-State
              dateDistMapInverse={this.state.dateDistMapInverse} // { dateDistMapInverse } from Component-State
              eventDistMap={this.state.eventDistMap} // { eventDistMap } from Component-State
              // For Mini-Calendar Only
              miniCalendar={this.props.miniCalendar} // If it's Mini-Calendar or Not
              miniCalendarState={this.props.miniCalendarState} // Mini-Calendar State { year } and { month }
              // events={this.props.events || []}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ calendarMonth, events, groups }, props) => {
  if (props.miniCalendar) return {
    year: calendarMonth.year,
    month: calendarMonth.month,
  }
  return {
    year: calendarMonth.year,
    month: calendarMonth.month,
    events: events.filter((event) => groups.some(({ _id, _isOnCalendar }) => {
      return (event._group === _id) && _isOnCalendar;
    })).sort((a, b) => {
      if (a.date_from === b.date_from) {
        return (a.date_from - a.date_to) > (b.date_from - b.date_to) ? 1 : -1;
      }
      return a.date_from > b.date_from ? 1 : -1;
    })
  }
};

const mapDispatchToProps = (dispatch) => ({
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContentComp);