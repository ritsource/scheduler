import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import moment from 'moment';
import _ from 'lodash';

// import { LinkedList }
import { generateMomentMonth, formatISOStringForMoment, funcHandleMonth, funcHandleYear } from '../../utils/month_cursor_helpers';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: 0,
      date_distribution_map: {},
      top_free_space_map: {}
    };
  }

  handleUrlNavigation = (year, month) => {
    const history = createBrowserHistory();
    history.push(`/calendar?year=${year}&month=${month}`);
  }

  findOutIndex = (year, month, dateVal, firstDay, numDatesThis, numDatesPrev) => {
    const monthNow = generateMomentMonth(year, month);
    const _itsPrevMonth = moment(dateVal).isBefore(moment(monthNow).valueOf(), 'month');
    const _itsNextMonth = moment(dateVal).isAfter(moment(monthNow).valueOf(), 'month');

    if (!numDatesThis) numDatesThis = parseInt(monthNow.endOf('month').format('D'));
    if (!numDatesPrev) numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));

    const mainDate = parseInt(moment(dateVal).format('DD'));

    console.log(moment(dateVal).format('DD-MM-YYYY'));
    
    console.log('_itsPrevMonth', _itsPrevMonth, mainDate);
    console.log('_itsNextMonth', _itsNextMonth, mainDate);
    
    return _itsPrevMonth
      ? (firstDay - (numDatesPrev - mainDate + 1))
      : _itsNextMonth
      ? (firstDay + numDatesThis + mainDate)
      : (firstDay + mainDate - 1);
  }

  updateTopFreeSpaceMap = async (year, month) => {
    let tempFreeSpaceMap = {};
    const { firstDay, date_distribution_map } = this.state;
    const { events }  = this.props;

    // if (events && _.isEmpty(date_distribution_map)) {
      events.map((event) => {
        const startDate = parseInt(moment(event.date_from).format('DD'));
        const startMonth = parseInt(moment(event.date_from).format('MM'));
        const endDate = parseInt(moment(event.date_to).format('DD'));
        const endMonth = parseInt(moment(event.date_to).format('MM'));
        
        const monthNow = generateMomentMonth(year, month);
        const numDatesThis = parseInt(monthNow.endOf('month').format('D'));
        const numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));

        // const startIndex = findOutIndex(year, month, date, firstDay, numDatesThis, numDatesPrev);
        // const startIndex = findOutIndex(year, month, date, firstDay, numDatesThis, numDatesPrev);
        
        console.log('LOL');
        
        tempFreeSpaceMap = this.findOutIndex(year, month, 1549045800000, firstDay, numDatesThis, numDatesPrev);
      });
    // }

    console.log('tempFreeSpaceMap', tempFreeSpaceMap);    
    return tempFreeSpaceMap;
  }

  updateDateDistribution = async (year, month, firstDay) => {
    const tempDistMap = { ...this.state.date_distribution_map };
    const numDatesThis = parseInt(generateMomentMonth(year, month).endOf('month').format('D'));

    for (let k = 0; k < 42; k++) {
      if (k < firstDay) {
        const value = moment(formatISOStringForMoment(year, month, 1)).subtract(firstDay - k, 'days').valueOf();
        if (tempDistMap[k] !== value) tempDistMap[k] = value;
      } else if (k >= firstDay + numDatesThis) {
        const value = moment(formatISOStringForMoment(year, month, numDatesThis)).add((k + 1) - (firstDay + numDatesThis), 'days').valueOf();
        if (tempDistMap[k] !== value) tempDistMap[k] = value;
      } else {
        const value = moment(formatISOStringForMoment(year, month, (k - firstDay + 1))).valueOf();
        if (tempDistMap[k] !== value) tempDistMap[k] = value;
      }
    }

    await this.setState({ date_distribution_map: tempDistMap });
  }

  async componentWillReceiveProps(nextProps) {
    const { year, month } = nextProps.miniCalendarState ? nextProps.miniCalendarState : nextProps;
    const { firstDay } = this.state;

    const temp_first_day = generateMomentMonth(year, month).startOf('month').day();
    if (temp_first_day !== firstDay) await this.setState({ firstDay: temp_first_day });

    this.updateDateDistribution(year, month, temp_first_day);
    this.updateTopFreeSpaceMap(year, month, temp_first_day);
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

    // console.log(this.state.date_distribution_map);    

    const monthNow = generateMomentMonth(year, month);
    const numDatesThis = parseInt(monthNow.endOf('month').format('D'));
    const numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));
    const numDatesNext = parseInt(monthNow.add(2, 'month').endOf('month').format('D')); // Cause these functions changes the object
    
    const isFiveRows = (this.state.firstDay + numDatesThis) <= 35;
    let rowArr;
    if (isFiveRows) rowArr = [1, 2, 3, 4, 5];
    else rowArr = [1, 2, 3, 4, 5, 6];
    
    return (
      <div className={this.props.miniCalendar ? 'calendar-content-000-mini' : 'calendar-content-000'}>
        {rowArr.map((x, i) => {
          return (
            <CalendarRowComp
              key={i}
              index={i}
              // date_distribution_map={this.state.date_distribution_map}
              numDatesPrev={numDatesPrev}
              numDatesThis={numDatesThis}
              year={year}
              month={month}
              rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.firstDay)}
              isFiveRows={isFiveRows}
              firstDay={this.state.firstDay}
              handleUrlNavigation={this.handleUrlNavigation}
              miniCalendar={this.props.miniCalendar}
              miniCalendarState={this.props.miniCalendarState}
              events={this.props.events || []}
              date_distribution_map={this.state.date_distribution_map}
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
    })).sort((a, b) => (a.date_from - a.date_to) > (b.date_from - b.date_to) ? 1 : -1)
  }
};

const mapDispatchToProps = (dispatch) => ({
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContentComp);