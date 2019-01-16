import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datepicker from 'awesome-react-datepicker';
import { Selector, Option } from 'react-dropdown-selector';
import { GoCheck } from 'react-icons/go';
import { FaCircle } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';

import { asyncDeleteEvent, asyncEditEventDate, asyncEditEvent } from '../../actions/event_actions';

class CalendarAddEventComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title || '',
      selectedGroup: props.groups[0] || null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selectedGroup === null && !!nextProps.groups.length) {
      this.setState({ selectedGroup: nextProps.groups[0] })
    }
  }

  render() {
    const { event } = this.props;
    const { selectedGroup } = this.state;
    
    return (
      <div className='calendar-event-view-comp-000' onClick={(e) => e.stopPropagation()}>
        <div className='calendar-event-view-title-box-001'>
        <form>
          <input
            className='awesome-app-transparent-input-999'
            placeholder='Title'
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
        </form>
        </div>
        <div className='calendar-event-view-dates-box-001'>
          <Datepicker uniqueId={'sakcjaskca-1'}
            initDate={new Date(event.date_from)}
            onDateSelect={(timeStamp) => {
              const { title, date_from, date_to } = this.props;
              this.props.setParentState({ theNewEvent: { title, date_from: timeStamp, date_to } });
            }}
          >
            <button className={`awesome-app-unique-btn-999`}>
              {new Date(event.date_from).getFormattedDate()}
            </button>
          </Datepicker>

          <p style={{ margin: '5px' }}>to</p>

          <Datepicker uniqueId={'sakcjaskca-1'}
            initDate={new Date(event.date_to)}
            onDateSelect={(timeStamp) => {
              const { title, date_from, date_to } = this.props;
              this.props.setParentState({ theNewEvent: { title, date_from, date_to: timeStamp } });
            }}
          >
            <button className={`awesome-app-unique-btn-999`}>
              {new Date(event.date_to).getFormattedDate()}
            </button>
          </Datepicker>
        
        </div>
        {selectedGroup && (
          <div className='calendar-event-view-group-delector-box-001'>
            <Selector
              onSelect={(id) => {
                
              }}
              inputHeight={36}
              optionHeight={36}
              numOptions={this.props.groups}
              numOptionsVisible={4}
              selectorBoxShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
              renderBtn={() => (
                <div className='any-dropdown-content-item-999'>
                  <FaCircle style={{
                    color: selectedGroup.hex_color, marginRight: '8px', marginBottom: '-2px'
                  }}/>
                  {selectedGroup.title}
                </div>
              )}
            >
              {this.props.groups.map((group, i) => (
                <Option key={i} id={group._id}>
                  <div className='any-dropdown-content-item-999' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'row', lignItems: 'center' }}>
                      <FaCircle style={{ color: group.hex_color, marginRight: '8px', marginBottom: '-2px' }}/>
                      {group.title}
                    </div>
                    {group._id === selectedGroup._id && <GoCheck />}
                  </div>
                </Option>
              ))}
            </Selector>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ groups }) => ({ groups });

const mapDispatchToProps = (dispatch) => ({
  asyncDeleteEvent: (xyz) => dispatch(asyncDeleteEvent(xyz)),
  asyncEditEventDate: (xyz, abc) => dispatch(asyncEditEventDate(xyz, abc)),
  asyncEditEvent: (xyz, abc) => dispatch(asyncEditEvent(xyz, abc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAddEventComp);