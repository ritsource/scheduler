import React from 'react';

class CalendarRowComp extends React.Component {
  
  
  render() {
    return (
      <div
        className='calendar-row-000'
        style={this.props.inFiveRows ? {height: 'calc((100% / 5) - 1px)'} : {height: 'calc((100% / 6) - 1px)'}}
      >
        {this.props.rowFirstDate}
      </div>
    );
  }
}

export default CalendarRowComp;