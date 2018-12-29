import React from 'react';

import CalendarContentComp from './calendar_content';

class CalendarSidebarComp extends React.Component {
  render() {
    return (
      <div className={`calendar-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        <CalendarContentComp miniCalendar={true}/>
      </div>
    );
  }
}

export default CalendarSidebarComp;