import React from 'react';

import TodoListIndicator from './todo_list_indicator';
import CustomRodalComp from '../reusables/custom_rodal';

class CalendarSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '...',
      input_disable: true,
      options_rodal_visible: false
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

        <button className='calendar-sidebar-item-options-btn' onClick={() => {
          this.setState({ options_rodal_visible: true });
        }}>
          <i className="fas fa-ellipsis-h"></i>
        </button>

        <CustomRodalComp
          borderRadius='0px'
          marginTop={`calc(350px)`}
          // left='30px'
          right={`calc(100vw - 240px)`}
          visible={this.state.options_rodal_visible}
          toggleVisibility={() => {
            this.setState({ options_rodal_visible: false });
          }}
        >
          <div className='sidebar-item-002-header-rodal-content'>
            <p onClick={async () => {
              await this.setState({ options_rodal_visible: false, input_disable: false });
              if (document) document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
            }}>
              <i style={{ color: group.hex_color }} className="far fa-edit"></i>
              Rename
            </p>

            {!group._isPermanent && (
              <p onClick={() => {
                this.setState({ options_rodal_visible: false });
                this.props.asyncDeleteGroup(group._id);
              }}>
                <i className="far fa-trash-alt"
                  style={{ color: group.hex_color, marginRight: '8px' }}
                ></i>
                Delete Group
              </p>
            )}
          </div>
        </CustomRodalComp>
      </div>
    );
  }
}

export default CalendarSidebarItem;