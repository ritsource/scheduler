import React from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import TodoListIndicator from './todo_list_indicator';
import CalendarSidebarColorComp from './calendar_sidebar_color';

class CalendarSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '. . .',
      input_disable: true,
      dropdown_visible: false,
      screenX: null,
      screenY: null,
      color_panel: {
        visible: false,
        screenX: null,
        screenY: null,
      }
    }
  }

  submitEditedTitle = () => {
    this.props.asyncEditGroup(this.props.group._id, { title: this.state.title }).then(() => {
      this.setState({ input_disable: true });
    });
  }

  componentWillReceiveProps(nextProps) {    
    if (nextProps.group.title !== this.state.title) {      
      this.setState({ title: nextProps.group.title });
    }
  }
  
  render() {
    const { group } = this.props;

    return (
      <div className='calendar-sidebar-item-000'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TodoListIndicator
            _isDone={group._isOnCalendar}
            hex_color={group.hex_color}
            patchFunction={async () => {
              await this.props.asyncEditGroup(group._id, { _isOnCalendar: !group._isOnCalendar });
            }}
            hide_tick_on_false={true}
          />
          <form className='calendar-sidebar-item-title-form-002' onSubmit={(e) => {
            e.preventDefault();
            this.submitEditedTitle();
          }}>
            <input
              id={`calendar-sidebar-item-input-inside-form-${group._id}`}
              disabled={this.state.input_disable}
              name='title'
              autoComplete='off'
              value={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
              onBlur={() => {
                this.setState({ title: group.title, input_disable: true });
              }}
            />
          </form>
        </div>

        <Dropdown
          visible={this.state.dropdown_visible}
          onButtonClick={(e) => {
            this.setState({ screenX: e.screenX, screenY: e.screenY, dropdown_visible: true });
          }}
          onClose={() => {
            this.setState({ screenX: null, screenY: null, dropdown_visible: false });
          }}
          preventDefaultClose={false}
          showArrow={false}
          arrowPosition={{ right: '0px' }}
          position={{
            left: `calc(${this.state.screenX}px - 8px)`,
            bottom: `calc(100vh - ${this.state.screenY}px + 80px)`
          }}
          modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
          modalBorder={false}
          modalContent={() => (
            <div>
              {!group._isPermanent && (
                <p className='any-dropdown-content-item-999' onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ dropdown_visible: false });
                  this.props.asyncDeleteGroup(group._id);
                }}><MdDelete style={{
                  marginRight: '8px',
                  marginBottom: '-2px'
                }}/>Delete Group</p>
              )}

              <p className='any-dropdown-content-item-999' onClick={async (e) => {
                e.stopPropagation();
                this.setState({ dropdown_visible: false, input_disable: false });
                if (document) document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
              }}><MdModeEdit style={{
                marginRight: '8px',
                marginBottom: '-2px'
              }}/>Rename</p>

              <Dropdown
                visible={this.state.color_panel.visible}
                // onButtonClick={(e) => {
                //   const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                //   this.setState({ color_panel: tempState });
                // }}
                onClose={() => {
                  const tempState = { screenX: null, screenY: null, visible: false };
                  this.setState({ color_panel: tempState });
                }}
                showArrow={false}
                position={{
                  left: `calc(${this.state.color_panel.screenX}px - 8px)`,
                  bottom: `calc(100vh - ${this.state.color_panel.screenY}px + 80px)`
                }}
                modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
                modalBorder={false}
                customZIndex={21}
                modalContent={() => (
                  <CalendarSidebarColorComp
                    color_options={this.props.color_options}
                    changeColorFunc={this.props.changeColorFunc}
                  />
                )}
              >
                <p className='any-dropdown-content-item-999' onClick={(e) => {
                  e.stopPropagation();
                  const tempState = { screenX: e.screenX, screenY: e.screenY, visible: true };
                  this.setState({ color_panel: tempState });
                }}>
                  <IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }}/>
                  Color
                </p>
              </Dropdown>              
            </div>
          )}
        >
          <button className='calendar-sidebar-item-options-btn' onClick={() => {
            this.setState({ dropdown_visible: true });
          }}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </Dropdown>
      </div>
    );
  }
}

export default CalendarSidebarItem;