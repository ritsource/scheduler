import React from 'react';

class CalendarRowItem extends React.Component {
  render() {
    return (
      <div style={(this.props.index === 6) ? {borderRight: '0px solid white'} : {}} className='calendar-row-item-000'>
        <p>{this.props.date}</p>
      </div>
    );
  }
}

export default CalendarRowItem;