import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import moment from 'moment';

import { generateMomentMonth } from '../../utils/month_cursor_helpers';
import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: 0
    };
  }

  handleUrlNavigation = (year, month) => {
    const history = createBrowserHistory();
    history.push(`/calendar?year=${year}&month=${month}`);
  }

  componentWillReceiveProps(nextProps) {
    const { year, month } = nextProps.miniCalendarState ? nextProps.miniCalendarState : nextProps;

    const temp_first_day = generateMomentMonth(year, month).startOf('month').day();
    if (temp_first_day !== this.state.firstDay) this.setState({ firstDay: temp_first_day });
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
      this.setState({
        firstDay: generateMomentMonth(year, month).startOf('month').day()
      });
    }
  }

  // 42 Boxes => 0 to 41

  render() {
    const tempProps = this.props.miniCalendarState ? this.props.miniCalendarState : this.props;
    const { year, month } = tempProps;

    const monthNow = generateMomentMonth(year, month);
    const numDatesThis = parseInt(monthNow.endOf('month').format('D'));
    const numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));
    const numDatesNext = parseInt(monthNow.add(2, 'month').endOf('month').format('D')); // Cause these functions changes the object
    
    const inFiveRows = (this.state.firstDay + numDatesThis) <= 35;
    let rowArr;
    if (inFiveRows) rowArr = [1, 2, 3, 4, 5];
    else rowArr = [1, 2, 3, 4, 5, 6];
    
    return (
      <div className={this.props.miniCalendar ? 'calendar-content-000-mini' : 'calendar-content-000'}>
        {rowArr.map((x, i) => {
          return (
            <CalendarRowComp
              key={i}
              index={i}
              numDatesPrev={numDatesPrev}
              numDatesThis={numDatesThis}
              year={year}
              month={month}
              rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.firstDay)}
              inFiveRows={inFiveRows}
              firstDay={this.state.firstDay}
              handleUrlNavigation={this.handleUrlNavigation}
              miniCalendar={this.props.miniCalendar}
              miniCalendarState={this.props.miniCalendarState}
              events={this.props.events}
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
    // TODO: try to find some better algo
    events: events.filter((event) => groups.some(({ _id, _isOnCalendar }) => {
      return (event._group === _id) && _isOnCalendar;
    }))
  }
};

const mapDispatchToProps = (dispatch) => ({
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContentComp);