import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import TodoListIndicator from './todo_list_indicator';
import Dropdown from 'react-dropdown-modal';

class CalendarSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '. . .',
      input_disable: true,
      dropdown_visible: false,
      screenX: null,
      screenY: null
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
          <form onSubmit={(e) => {
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
          // visible={this.state.title === 'Tasks' ? true : this.state.dropdown_visible}
          onButtonClick={(e) => {
            console.log(e.screenX, e.screenY);
            this.setState({ screenX: e.screenX, screenY: e.screenY, dropdown_visible: true });
          }}
          onClose={() => {
            this.setState({ screenX: null, screenY: null, dropdown_visible: false });
          }}
          showArrow={false}
          arrowPosition={{ right: '0px' }}
          position={{
            left: `calc(${this.state.screenX}px - 8px)`,
            // top: `${this.state.screenY}px`,
            bottom: `calc(100vh - ${this.state.screenY}px + 80px)`
          }}
          modalShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
          modalBorder={false}
          // backgroundMaskColor='rgba(1, 1, 1, 0.1)'
          modalContent={() => (
            <div>
              {!group._isPermanent && (
                <p className='any-dropdown-content-item-999' onClick={() => {
                  this.setState({ dropdown_visible: false });
                  this.props.asyncDeleteGroup(group._id);
                }}><MdDelete style={{
                  marginRight: '8px',
                  marginBottom: '-2px'
                }}/>Delete Group</p>
              )}

              <p className='any-dropdown-content-item-999' onClick={async () => {
                await this.setState({ dropdown_visible: false, input_disable: false });
                if (document) document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
              }}><MdModeEdit style={{
                marginRight: '8px',
                marginBottom: '-2px'
              }}/>Rename</p>
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