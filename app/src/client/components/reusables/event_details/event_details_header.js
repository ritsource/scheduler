import React from 'react';
import EventDoneIndicator from '../event_done_indicator';

const EventDetailsHeaderComp = (props) => {
  return (
  <div style={{ padding: '0px 0px', /*border: '1px solid red' */}}>
      <form onSubmit={async (e) => {   
        e.preventDefault();
        if (props.title !== '') {
          await props.asyncEditEvent(props.event._id, { title: props.title });
          if (document) document.querySelector('#todo-details-input-inside-form').blur();
        }
      }}>
        <EventDoneIndicator
          _isDone={props.event._isDone}
          hex_color={props.hex_color}
          patchFunction={() => {
            props.asyncPatchEvent_isDone(
              props.event._id,
              !props.event._isDone
            );
          }}
        />
        <input
          id='todo-details-input-inside-form'
          name='listname'
          autoComplete='off'
          className='awesome-app-transparent-input-999'
          value={props.title}
          onChange={(e) => {
            props.setParentState({ title: e.target.value });
          }}
        />
      </form>
    </div>
  );
}

export default EventDetailsHeaderComp;