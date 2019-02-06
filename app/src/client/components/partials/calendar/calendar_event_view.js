import React, { Component } from 'react';
import { connect } from 'react-redux';
import Datepicker from 'awesome-react-datepicker';
import { Selector, Option } from 'react-dropdown-selector';
import { GoCheck } from 'react-icons/go';
import { FaCircle, FaStream, FaTrash, FaEllipsisV, FaTimes } from 'react-icons/fa';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { builtin_color_list } from '../../../utils/constants';

import { asyncDeleteEvent, asyncEditEventDate, asyncEditEvent } from '../../../actions/event_actions';
import EnsureDeletionComp from '../../reusables/ensure_deletion';
import SubOptColorComp from '../../reusables/opt_dropdowns/sub_opt_color'

class CalendarEventViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title || '',
      dFromAsync: false,
      dToAsync: false,
      groupAsync: false,
      askforDelete: false,
      askforDelete_close: false,
      color_panel: {
        screenX: null,
        screenY: null,
        visible: false
      }
    };
  }

  handleEventDelete = async (id) => {
    await this.props.asyncDeleteEvent(id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.title !== nextProps.title) {
      this.setState({ title: nextProps.title });
    }
  }

  render() {
    const { dFromAsync, dToAsync, groupAsync, color_panel } = this.state;
    const { event, toggleEventDetails } = this.props;
    const groupNow = this.props.groups.find(({ _id }) => _id === event._group);
    // console.log(this.props.toggleEventDetails);

    return (
      <div className='calendar-event-view-comp-000' onClick={(e) => e.stopPropagation()}>
        <div className='calendar-event-view-tools-box-001'>
          <div title='View Event'>
            <FaStream  
              style={{ marginLeft: '15px' }}
              onClick={() => this.props.animatedClosing(() => toggleEventDetails(event))}
            />
          </div>
          <EnsureDeletionComp
            visible={this.state.askforDelete}
            message='Are you sure you want to delete the event?'
            onClose={() => {
              this.setState({ askforDelete_close: true, askforDelete: false });
              setTimeout(() => {
                this.setState({ askforDelete_close: false });
              }, 300);
            }}
            onDelete={() => this.props.animatedClosing(async () => await this.handleEventDelete(event._id))}
            onCancel={() => {
              this.setState({ askforDelete_close: true });
              setTimeout(() => {
                this.setState({ askforDelete_close: false });
              }, 300);
            }}
          >
            <div title='Delete Event'>
              <FaTrash style={{ marginLeft: '15px', marginTop: '3px' }} onClick={() => {
                this.setState({ askforDelete: true });
              }}/>
            </div>
          </EnsureDeletionComp>
          

          <Dropdown
            visible={color_panel.visible}
            onClose={() => {
              const tempState = { screenX: null, screenY: null, visible: false };
              this.setState({ color_panel: tempState });
            }}
            showArrow={false}
            position={{
              left: `calc(${color_panel.screenX}px - 8px)`,
              bottom: `calc(100vh - ${color_panel.screenY + 8}px)`
            }}
            modalBackground='var(--background-color)'
            modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
            modalBorder={false}
            customZIndex={21}
            modalContent={() => (
              <SubOptColorComp
                color_options={[ ...builtin_color_list, ...this.props.auth.custom_colors]}
                changeColorFunc={async (color) => {
                  await this.props.asyncEditEvent(event._id, { hex_color: color });
                }}
                animatedClosing={this.props.animatedClosing}
              />
            )}
          >
            <div title='Change Color'>
              <FaCircle
                onClick={(e) => {
                  e.stopPropagation();
                  const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                  this.setState({ color_panel: tempState });
                }}
                style={{ marginLeft: '15px', marginTop: '3px', color: event.hex_color }}
              />
            </div>
          </Dropdown>
        </div>
        
        <div className='calendar-event-view-title-box-001'>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.animatedClosing(() => {
            this.props.asyncEditEvent(event._id, { title: this.state.title });
          })
        }}>
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
              this.setState({ dFromAsync: true });
              this.props.asyncEditEventDate(event._id, { date_from: timeStamp }).then(() => {
                this.setState({ dFromAsync: false });
              });
            }}
          >
            <button name='Change Date-from' className='awesome-app-unique-btn-999' style={dFromAsync ? {
              transition : 'border 0.3s ease-out',
              animation: 'asyncButtonText 0.6s infinite',
            } : {}}>
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
            <button name='Change Date-to' className='awesome-app-unique-btn-999' style={dToAsync ? {
              transition : 'border 0.3s ease-out',
              animation: 'asyncButtonText 0.6s infinite',
            } : {}}>
              {new Date(event.date_to).getFormattedDate()}
            </button>
          </Datepicker>
        
        </div>
        <div className='calendar-event-view-group-delector-box-001'>
        <Selector
          onSelect={(id) => {
            this.setState({ groupAsync: true });
            this.props.asyncEditEvent(event._id, { _group: id }).then(() => {
              this.setState({ groupAsync: false });
            });
          }}
          inputHeight={36}
          optionHeight={36}
          numOptions={this.props.groups.length}
          numOptionsVisible={4}
          selectorBoxShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
          renderBtn={() => (
            <div className='any-dropdown-content-item-999'>
              <FaCircle style={groupAsync ? {
                marginRight: '8px',
                marginBottom: '-2px',
                transition : 'border 0.3s ease-out',
                animation: 'asyncButtonText 0.6s infinite',
              } : { color: groupNow.hex_color, marginRight: '8px', marginBottom: '-2px' }}/>
              {groupNow.title}
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
                {group._id === groupNow._id && <GoCheck />}
              </div>
            </Option>
          ))}
        </Selector>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ groups, auth }) => ({ groups, auth });

const mapDispatchToProps = (dispatch) => ({
  asyncDeleteEvent: (xyz) => dispatch(asyncDeleteEvent(xyz)),
  asyncEditEventDate: (xyz, abc) => dispatch(asyncEditEventDate(xyz, abc)),
  asyncEditEvent: (xyz, abc) => dispatch(asyncEditEvent(xyz, abc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarEventViewComp);