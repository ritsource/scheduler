import React from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import moment from 'moment';

import { SET_CALENDAR_MONTH_STATE } from '../../actions/_action_types';
import CalendarRowComp from './calendar_row';

class CalendarContentComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstDay: 0
    };
  }

  findMomentMonth = (year, month) => {
    let temp_text;
    if (month.toString().length === 1) temp_text = `${year}-0${month}`;
    else temp_text = `${year}-${month}`;
    return moment(temp_text);
  }

  componentWillReceiveProps({ year, month }) {
    const temp_first_day = this.findMomentMonth(year, month).startOf('month').day();

    if (temp_first_day !== this.state.firstDay) {
      this.setState({ firstDay: temp_first_day });
    }
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    await this.props.setReduxCalendar({
      year: parseInt(urlParams.get('year')) || parseInt(moment().format('YYYY')),
      month: parseInt(urlParams.get('month')) || parseInt(moment().format('M')),
    });
    const history = createBrowserHistory();
    history.push(`/calendar?year=${this.props.year}&month=${this.props.month}`);

    if (this.state.firstDay === 0) {
      this.setState({
        firstDay: this.findMomentMonth(this.props.year, this.props.month).startOf('month').day()
      });
    }
  }

  // 42 Boxes => 0 to 41

  render() {
    const monthNow = this.findMomentMonth(this.props.year, this.props.month);
    const numDatesThis = parseInt(monthNow.endOf('month').format('D'));
    const numDatesPrev = parseInt(monthNow.subtract(1, 'month').endOf('month').format('D'));
    const numDatesNext = parseInt(monthNow.add(2, 'month').endOf('month').format('D')); // Cause these functions changes the object
    
    const inFiveRows = (this.state.firstDay + numDatesThis) <= 35;
    let rowArr;
    if (inFiveRows) rowArr = [1, 2, 3, 4, 5];
    else rowArr = [1, 2, 3, 4, 5, 6];    
    
    return (
      <React.Fragment>
        {this.props.miniCalendar ? (
          <div className='calendar-content-000-mini'>
            {rowArr.map((x, i) => {
              return (
                <CalendarRowComp
                  key={i}
                  index={i}
                  numDatesPrev={numDatesPrev}
                  numDatesThis={numDatesThis}
                  rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.firstDay)}
                  inFiveRows={inFiveRows}
                  miniCalendar={this.props.miniCalendar}
                  firstDay={this.state.firstDay}
                />
              );
            })}
          </div>
        ) : (
          <div className='calendar-content-000'>
            {rowArr.map((x, i) => {
              return (
                <CalendarRowComp
                  key={i}
                  index={i}
                  numDatesPrev={numDatesPrev}
                  numDatesThis={numDatesThis}
                  rowFirstDate={((7 * (i - 1)) + 1) + (7 - this.state.firstDay)}
                  inFiveRows={inFiveRows}
                  firstDay={this.state.firstDay}
                  // events
                />
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ calendarMonth, events }) => ({
  year: calendarMonth.year,
  month: calendarMonth.month,
  events: events
});

const mapDispatchToProps = (dispatch) => ({
  setReduxCalendar: ({ year, month }) => dispatch({ type: SET_CALENDAR_MONTH_STATE, year, month })
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContentComp);