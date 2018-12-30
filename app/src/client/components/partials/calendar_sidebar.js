import React from 'react';
import moment from 'moment';

import CalendarContentComp from './calendar_content';
import CalendarSidebarNavigator from './calendar_sidebar_navigator';

class CalendarSidebarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M'))
    };
  }

  handleNavigation = (bool) => {
    const funcHandleMonth = (prevMonth, bool) => {
      if (prevMonth === 1) return bool ? prevMonth + 1 : 12;
      else if (prevMonth === 12) return bool ? 1 : prevMonth - 1;
      else return bool ? prevMonth + 1 : prevMonth - 1;
    }

    const funcHandleYear = (prevYear, prevMonth, bool) => {
      if (prevMonth !== 1 && prevMonth !== 12) return prevYear;
      else if (prevMonth === 12) return bool ? prevYear + 1 : prevYear;
      else if (prevMonth === 1) return bool ? prevYear : prevYear - 1
    }

    this.setState((prevState) => ({
      year: funcHandleYear(prevState.year, prevState.month, bool),
      month: funcHandleMonth(prevState.month, bool)
    }));
  }

  navigateToNow = () => {
    this.setState((prevState) => ({
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M')),
    }));
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    await this.setState({
      year: parseInt(urlParams.get('year')) || parseInt(moment().format('YYYY')),
      month: parseInt(urlParams.get('month')) || parseInt(moment().format('M')),
    });
  }

  render() {
    return (
      <div className={`calendar-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        <CalendarSidebarNavigator
          miniCalendarState={this.state}
          handleNavigation={this.handleNavigation}
          navigateToNow={this.navigateToNow}
        />
        <CalendarContentComp miniCalendarState={this.state} miniCalendar={true}/>
      </div>
    );
  }
}

export default CalendarSidebarComp;