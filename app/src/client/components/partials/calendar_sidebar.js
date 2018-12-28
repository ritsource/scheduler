import React from 'react';

class CalendarSidebarComp extends React.Component {
  render() {
    return (
      <div className={`calendar-sidebar-000 ${this.props.visible ? 'sidebar-slided-right' : 'sidebar-slided-left'}`}>
        CalendarSidebarComp
      </div>
    );
  }
}

export default CalendarSidebarComp;