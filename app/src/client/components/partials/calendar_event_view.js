import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncDeleteEvent } from '../../actions/event_actions';

class CalendarEventViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: true
    }
  }
  
  getFormattedDate = (stamp) => {
    console.log(stamp);
    
    return `${new Date(stamp).getFullYear()}-${new Date(stamp).getMonth()}-${new Date(stamp).getDate()}`;
  }

  render() {
    const { editTitle } = this.state;
    const { event } = this.props;
    return (
      <div className='calendar-event-view-comp-000' onClick={(e) => e.stopPropagation()}>
        <div className='calendar-event-view-title-box-001'>
          {editTitle ? (
            <form>
              <input
                value='React Native'
              />
            </form>
          ) : (
            <p>React Native</p>
          )}
        </div>
        <div className='calendar-event-view-dates-box-001'>
          <div>{new Date(event.date_from).getFormattedDate()}</div>
          <div>{new Date(event.date_to).getFormattedDate()}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  asyncDeleteEvent: (xyz) => dispatch(asyncDeleteEvent(xyz))
})

export default connect(null, mapDispatchToProps)(CalendarEventViewComp);