import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

import { asyncDeleteEvent, asyncEditEvent, asyncEditEventDate, asyncPatchEvent_isDone } from '../../../actions/event_actions';
import { asyncFetchSteps, asyncPostStep, asyncPatchStep_isDone, asyncEditStep, asyncDeleteStep, rearrangeReduxSteps, asyncRearrangeSteps } from '../../../actions/step_actions';
import EventDetailsItem from './event_details_item';
import EventDetailsHeaderComp from './event_details_header';
import EventDetailsButtonsComp from './event_details_buttons';

export const EventDetailsComp = (props) => {
  const [ stepTitle, setStepTitle ] = useState('');

  useEffect(() => {
    props.asyncFetchSteps();
  }, []);

  const handleEventDelete = async (id) => {
    await props.asyncDeleteEvent(id);
  }

  const onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    const tempSteps = [ ...props.steps ];    

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    const movedSteps = (fromIndex < toIndex)
    ? tempSteps.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
    : tempSteps.slice(toIndex, fromIndex).map(({ _id }) => _id);

    props.asyncRearrangeSteps({
      focusedStep: result.draggableId,
      fromRank: tempSteps[fromIndex]._rank,
      toRank: tempSteps[toIndex]._rank,
      movedSteps: movedSteps
    });

    props.rearrangeReduxSteps({
      fromRank: tempSteps[fromIndex]._rank,
      toRank: tempSteps[toIndex]._rank,
    });
  };
  
  return (
    <div className='todo-details-comp-000 any-list-comp-container-999'>
      <EventDetailsHeaderComp
        event={props.event}
        hex_color={props.hex_color}
        asyncEditEvent={props.asyncEditEvent}
        asyncPatchEvent_isDone={props.asyncPatchEvent_isDone}
      />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={props.event._id} type='STEP_DND'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                id='details-steps-list-inside-container'
                style={{ marginTop: '10px' }}
                className='any-list-comp-the-list-999'
              >
                {props.steps.map((step, i) => {
                  return (
                    <EventDetailsItem
                      key={i}
                      index={i}
                      step={step}
                      hex_color={props.hex_color}
                      asyncPatchStep_isDone={props.asyncPatchStep_isDone}
                      asyncEditStep={props.asyncEditStep}
                      asyncDeleteStep={props.asyncDeleteStep}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <form style={{ marginTop: '10px' }}
          className='any-list-comp-bottom-form-999'
          onSubmit={async (e) =>  {
            e.preventDefault();
            if (stepTitle !== '') {
              await props.asyncPostStep({ title: stepTitle, _event: props.event._id });
              setStepTitle('');
              scrollToBottom('#details-steps-list-inside-container');
            }
          }}
        >
          <input
            style={{ padding: '6px 0px' }}
            name='title'
            autoComplete='off'
            placeholder='+ Add Step'
            value={stepTitle}
            onChange={(e) => setStepTitle(e.target.value)}
          ></input>
          {stepTitle && (
            <button name='Add Step' className='any-list-comp-form-submit-btn-003' type='submit'>Add</button>
          )}
        </form>

        <EventDetailsButtonsComp
          { ...props }
          handleEventDelete={handleEventDelete}
        />
    </div>
  );
}

const mapStateToProps = ({ steps, groups }, props) => ({
  groups,
  steps: steps.filter(({ _event }) => {
    return _event === props.event._id;
  }).sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncDeleteEvent: (xyz) => dispatch(asyncDeleteEvent(xyz)),
  asyncEditEvent: (abc, xyz) => dispatch(asyncEditEvent(abc, xyz)),
  asyncEditEventDate: (xyz, abc) => dispatch(asyncEditEventDate(xyz, abc)),
  asyncFetchSteps: () => dispatch(asyncFetchSteps()),
  asyncPostStep: (abc) => dispatch(asyncPostStep(abc)),
  asyncPatchEvent_isDone: (abc, xyz) => dispatch(asyncPatchEvent_isDone(abc, xyz)),
  asyncPatchStep_isDone: (abc, xyz) => dispatch(asyncPatchStep_isDone(abc, xyz)),
  asyncEditStep: (abc, xyz) => dispatch(asyncEditStep(abc, xyz)),
  asyncDeleteStep: (abc, xyz) => dispatch(asyncDeleteStep(abc)),
  asyncRearrangeSteps: (abc) => dispatch(asyncRearrangeSteps(abc)),
  rearrangeReduxSteps: (abc) => dispatch(rearrangeReduxSteps(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsComp);