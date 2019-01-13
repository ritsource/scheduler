import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datepicker from 'awesome-react-datepicker';

import { asyncDeleteEvent, asyncEditEventDate } from '../../actions/event_actions';

class CalendarEventViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: true,
      dFromAsync: false,
      dToAsync: false,
    };
  }

  render() {
    const { editTitle, dFromAsync, dToAsync } = this.state;
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
          <Datepicker uniqueId={'sakcjaskca-1'}
            initDate={new Date(event.date_from)}
            onDateSelect={(timeStamp) => {
              this.setState({ dFromAsync: true });
              this.props.asyncEditEventDate(event._id, { date_from: timeStamp }).then(() => {
                this.setState({ dFromAsync: false });
              });
            }}
          >
            <button className={`view-dates-box-btn-002 ${dFromAsync && 'view-dates-box-btn-002-async'}`}>
              {new Date(event.date_from).getFormattedDate()}
            </button>
          </Datepicker>

          <p style={{ margin: '5px' }}>to</p>

          <Datepicker uniqueId={'sakcjaskca-1'}
            initDate={new Date(event.date_to)}
            onDateSelect={(timeStamp) => {
              this.setState({ dToAsync: true });
              this.props.asyncEditEventDate(event._id, { date_to: timeStamp }).then(() => {
                this.setState({ dToAsync: false });
              });
            }}
          >
            <button className={`view-dates-box-btn-002 ${dToAsync && 'view-dates-box-btn-002-async'}`}>
              {new Date(event.date_to).getFormattedDate()}
            </button>
          </Datepicker>
        
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  asyncDeleteEvent: (xyz) => dispatch(asyncDeleteEvent(xyz)),
  asyncEditEventDate: (xyz, abc) => dispatch(asyncEditEventDate(xyz, abc))
})

export default connect(null, mapDispatchToProps)(CalendarEventViewComp);