import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import EventDoneIndicator from '../event_done_indicator';

export const EventDetailsItem = (props) => {
  const [ title, setTitle ] = useState(props.step.title || '');

  const thisStep = props.step;

  useEffect(() => {
    if (thisStep.title !== title) setTitle(thisStep.title);
  });

  return (
    <Draggable draggableId={thisStep._id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todo-details-item-comp-000'
        >
          <EventDoneIndicator
            _isDone={thisStep._isDone}
            hex_color={props.hex_color}
            patchFunction={() => {
              props.asyncPatchStep_isDone(thisStep._id, !thisStep._isDone);
            }}
          />
          <form onSubmit={async (e) => {
            e.preventDefault();
            await props.asyncEditStep(thisStep._id, { title: title });
            if (document) document.querySelector(`#todo-details-item-input-inside-form-${thisStep._id}`).blur();
          }}>
            <input
              style={thisStep._isDone ? { textDecoration: 'line-through' } : {}}
              id={`todo-details-item-input-inside-form-${thisStep._id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={async () => {
                await props.asyncEditStep(thisStep._id, { title: title });
              }}
            />
          </form>
          <div
            className='details-item-step-delete-button-001'
            onClick={() => {
              props.asyncDeleteStep(thisStep._id);
            }}
          >X</div>
        </div>
      )}
    </Draggable>
  );
}

export default EventDetailsItem;