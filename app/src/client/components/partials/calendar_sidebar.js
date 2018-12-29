import React from 'react';
import moment from 'moment';

import CalendarContentComp from './calendar_content';

class CalendarSidebarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('M'))
    };
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
        <CalendarContentComp miniYear={this.state.year} miniMonth={this.state.month} miniCalendar={true}/>
      </div>
    );
  }
}

export default CalendarSidebarComp;