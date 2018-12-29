import React from 'react';
import { connect } from 'react-redux';

import { month_name_dictionary } from '../../utils/month_name_dictionary';

class CalendarRowItem extends React.Component {
  render() {    
    return (
      <div style={(this.props.index === 6) ? {borderRight: '0px solid white'} : {}} className='calendar-row-item-000'>
        <p>
          {this.props.date}
          {(this.props.date === 1) && (
            <React.Fragment>
              {(this.props.rowIndex === 0) ? (
                <span>{month_name_dictionary[this.props.month - 1]}</span>
              ) : (
                <span>{month_name_dictionary[(this.props.month === 12) ? 0 : this.props.month]}</span>
              )}
            </React.Fragment>
          )}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ calendarMonth }) => ({ month: calendarMonth.month });

export default connect(mapStateToProps)(CalendarRowItem);