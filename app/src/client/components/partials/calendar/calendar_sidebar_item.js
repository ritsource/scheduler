import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import EventDoneIndicator from '../../reusables/event_done_indicator';
import GroupOptDropdownComp from '../../reusables/opt_dropdowns/group_opt';

export const CalendarSidebarItem = (props) => {
  const [ title, setTitle ] = useState('. . .');
  const [ input_disable, setInputDis ] = useState(true);
  const [ dropdown_visible, setDropdownVis ] = useState(false);
  const [ screenX, setScreenX ] = useState(null);
  const [ screenY, setScreenY ] = useState(null);
  const [ windowHeightDiff, setWindowHeightDiff ] = useState(0);

  const { group } = props;

  useEffect(() => {
    if (group && group.title !== title) {
      setTitle(group.title);
    }
  }, []);

  const submitEditedTitle = () => {
    props.asyncEditGroup(props.group._id, { title: title }).then(() => {
      setInputDis(true);
    });
  }

  return (
    <div className='calendar-sidebar-item-000'>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <EventDoneIndicator
          _isDone={group._isOnCalendar}
          hex_color={group.hex_color}
          patchFunction={async () => {
            await props.asyncEditGroup(group._id, { _isOnCalendar: !group._isOnCalendar });
          }}
          hide_tick_on_false={true}
          squareShaped={true}
        />
        <form className='calendar-sidebar-item-title-form-002' onSubmit={(e) => {
          e.preventDefault();
          submitEditedTitle();
        }}>
          <input
            id={`calendar-sidebar-item-input-inside-form-${group._id}`}
            disabled={input_disable}
            name='title'
            autoComplete='off'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setTitle(group.title);
              setInputDis(true);
            }}
          />
        </form>
      </div>

      <GroupOptDropdownComp calendar_sidebar_item={true}
        { ...props }
        dropdown_visible={dropdown_visible}
        windowHeightDiff={windowHeightDiff}
        hex_color={group.hex_color}
        showDropdown={(x, y, whd) => {
          setWindowHeightDiff(whd);
          setScreenX(x);
          setScreenY(y);
          setDropdownVis(true);
        }}
        hideDropdown={() => {
          setDropdownVis(false);
          setScreenX(null);
          setScreenY(null);          
        }}
        positionObj={{
          left: `calc(${screenX}px - 8px)`,
          bottom: `calc(100vh - ${screenY - windowHeightDiff + 8}px)`,
        }}
        // subPositionObj={}
        onRenameClick={async () => {
          await setDropdownVis(false);
          await setInputDis(false);
          document.querySelector(`#calendar-sidebar-item-input-inside-form-${group._id}`).focus();
        }}
      >
        <button name='More Options' className='calendar-sidebar-item-options-btn' onClick={() => {
          setDropdownVis(true);
        }}>
          <FaEllipsisV />
        </button>
      </GroupOptDropdownComp>
    </div>
  );


}

export default CalendarSidebarItem;