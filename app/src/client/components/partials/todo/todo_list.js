import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { builtin_color_list } from '../../../utils/constants';
import { asyncFetchEvents, asyncPostEvent, asyncRearrangeEvents, rearrangeReduxEvents } from '../../../actions/event_actions';
import { asyncEditGroup, asyncDeleteGroup } from '../../../actions/group_actions';
import TodoListItem from './todo_list_item';
import TodoListForm from './todo_list_form';
import TodoListHeader from './todo_list_header';

export const TodoListComp = (props) => {
  const [ events, setEvents ] = useState(props.events);
  const [ loading_anime, setLoadingAnime ] = useState(false);

  useEffect(() => {
    // props.asyncFetchEvents();
    if (!_.isEqual(events, props.events)) setEvents(props.events);
  });

  const onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    setLoadingAnime(true);

    const tempEvents = [ ...events ];

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    const movedEvents = (fromIndex < toIndex)
      ? tempEvents.slice(fromIndex + 1, toIndex + 1).map(({ _id }) => _id)
      : tempEvents.slice(toIndex, fromIndex).map(({ _id }) => _id);
    
    props.asyncRearrangeEvents({
      focusedEvent: result.draggableId,
      fromRank: tempEvents[fromIndex]._rank,
      toRank: tempEvents[toIndex]._rank,
      movedEvents: movedEvents
    }).then(() => {
      setLoadingAnime(false);
    });

    props.rearrangeReduxEvents({
      fromRank: tempEvents[fromIndex]._rank,
      toRank: tempEvents[toIndex]._rank,
    });
  };

  return (
    <div className='todo-list-000'>
      {!props.activeGroup ? (
        <Redirect to='/todo' />
      ) : (
        <React.Fragment>
          <div className='any-list-comp-container-999'>
            <TodoListHeader
              activeGroup={props.activeGroup}
              asyncEditGroup={props.asyncEditGroup}
              asyncDeleteGroup={props.asyncDeleteGroup}
              loading_anime={loading_anime}
              
              color_options={[ ...builtin_color_list, ...props.auth.custom_colors]}
              changeColorFunc={async (color) => {
                await props.asyncEditGroup(props.activeGroup._id, { hex_color: color });
              }}
            />

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={props.active_groupId} type='EVENT_DND'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    id='the-event-list-inside-container'
                    className='any-list-comp-the-list-999'
                  >
                    {events.map((event, i) => {
                      return (
                        <TodoListItem
                          key={i}
                          index={i}
                          event={event}
                          changeEventId={props.changeEventId}
                          activeGroup={props.activeGroup}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <TodoListForm
            activeGroup={props.activeGroup}
            asyncPostEvent={props.asyncPostEvent}
          />
        </React.Fragment>
      )}
    </div>
  );
}

const mapStateToProps = ({ events, auth }, props) => ({
  auth,
  events: events.filter(({ _group }) => {
    return _group === props.active_groupId;
  }).sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncFetchEvents: (abc) => dispatch(asyncFetchEvents(abc)),
  asyncPostEvent: (abc) => dispatch(asyncPostEvent(abc)),
  asyncRearrangeEvents: (abc) => dispatch(asyncRearrangeEvents(abc)),
  rearrangeReduxEvents: (abc) => dispatch(rearrangeReduxEvents(abc)),
  asyncEditGroup: (abc, xyz) => dispatch(asyncEditGroup(abc, xyz)),
  asyncDeleteGroup: (abc) => dispatch(asyncDeleteGroup(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComp);