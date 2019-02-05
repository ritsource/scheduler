import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datepicker from 'awesome-react-datepicker';
import { Selector, Option } from 'react-dropdown-selector';
import { GoCheck } from 'react-icons/go';
import { FaCircle } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';

import { asyncPostEvent } from '../../../actions/event_actions';

class CalendarAddEventComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title || '',
      selectedGroup: props.visGroups[0] ? props.visGroups[0] : props.groups[0] || null
    };
  }

  handleSubmit = () => {
    if (this.state.title !== '') {
      this.props.animatedClosing(async () => {
        await this.props.asyncPostEvent({
          title: this.state.title,
          date_from: this.props.event.date_from,
          date_to: this.props.event.date_to,
          _group: this.state.selectedGroup._id,
          hex_color: this.state.selectedGroup.hex_color
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.groups.filter(({ _isOnCalendar }) => _isOnCalendar)[0]);  
    if (this.state.selectedGroup === null && !!nextProps.groups.length) {
      this.setState({ selectedGroup: nextProps.visGroups[0] ? nextProps.visGroups[0] : nextProps.groups[0] })
    }
  }

  render() {
    const { event } = this.props;
    const { selectedGroup } = this.state;
    
    return (
      <div className='calendar-event-view-comp-000' onClick={(e) => e.stopPropagation()}>
        <div className='calendar-event-view-title-box-001'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit();
        }}>
          <input
            autoFocus={true}
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
              const { title, date_from, date_to } = event;
              this.props.setParentState({ theNewEvent: { title, date_from: timeStamp, date_to } });
            }}
          >
            <button name='Change Date-from' className={`awesome-app-unique-btn-999`}>
              {new Date(event.date_from).getFormattedDate()}
            </button>
          </Datepicker>

          <p style={{ margin: '5px' }}>to</p>

          <Datepicker uniqueId={'sakcjaskca-1'}
            initDate={new Date(event.date_to)}
            onDateSelect={(timeStamp) => {
              const { title, date_from, date_to } = event;
              this.props.setParentState({ theNewEvent: { title, date_from, date_to: timeStamp } });
            }}
          >
            <button name='Change Date-to' className={`awesome-app-unique-btn-999`}>
              {new Date(event.date_to).getFormattedDate()}
            </button>
          </Datepicker>
        
        </div>
        {selectedGroup && (
          <div className='calendar-event-view-group-delector-box-001'>
            <Selector
              onSelect={(group) => {
                this.setState({ selectedGroup: group });
              }}
              inputHeight={36}
              optionHeight={36}
              numOptions={this.props.groups.length}
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
                <Option key={i} id={group}>
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
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: '10px'
        }}>
          <button name='Add a new Event'
            className={`awesome-app-unique-btn-999`}
            onClick={this.handleSubmit}
            style={{
              background: 'var(--theme-color-middle)',
              color: 'white'
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ groups }) => ({
  groups, visGroups: groups.filter(({ _isOnCalendar }) => _isOnCalendar)
});

const mapDispatchToProps = (dispatch) => ({
  asyncPostEvent: (xyz) => dispatch(asyncPostEvent(xyz)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAddEventComp);