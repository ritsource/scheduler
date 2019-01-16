import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import TodoListIndicator from './todo_list_indicator';
import GroupOptDropdownComp from './group_opt_dropdown';

class CalendarSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '. . .',
      input_disable: true,
      dropdown_visible: false,
      screenX: null,
      screenY: null,
      windowHeightDiff: 0,
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
    const { screenX, screenY, windowHeightDiff, color_panel } = this.state;

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
            squareShaped={true}
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

        <GroupOptDropdownComp
          { ...this.state }
          { ...this.props }
          positionObj={{
            left: `calc(${screenX}px - 8px)`,
            bottom: `calc(100vh - ${screenY - windowHeightDiff + 8}px)`
          }}
          subPositionObj={{
            left: `calc(${color_panel.screenX}px - 8px)`,
            bottom: `calc(100vh - ${color_panel.screenY - windowHeightDiff + 8}px)`
          }}
          setParentState={(obj) => {
            this.setState(obj);
          }}
          onRenameClick={async () => {
            await this.setState({ dropdown_visible: false, input_disable: false });
            document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
          }}
        >
          <button className='calendar-sidebar-item-options-btn' onClick={() => {
            this.setState({ dropdown_visible: true });
          }}>
            <FaEllipsisV />
          </button>
        </GroupOptDropdownComp>
      </div>
    );
  }
}

export default CalendarSidebarItem;