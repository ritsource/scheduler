import React from 'react';

import TodoListIndicator from './todo_list_indicator';

const CalendarSidebarItem = (props) => (
  <div className='calendar-sidebar-item-000'>
    <TodoListIndicator
      _isDone={props.group._isOnCalendar}
      hex_color={props.group.hex_color}
      patchFunction={async () => {
        await props.asyncEditGroup(props.group._id, { _isOnCalendar: !props.group._isOnCalendar });
      }}
      hide_tick_on_false={true}
    />
    {props.group.title}
  </div>
);

export default CalendarSidebarItem;