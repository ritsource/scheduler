import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncFetchEvents, asyncPostEvent, asyncRearrangeEvents, rearrangeReduxEvents } from '../../actions/event_actions';
import { asyncEditGroup, asyncDeleteGroup } from '../../actions/group_actions';
import TodoListItem from './todo_list_item';
import TodoListForm from './todo_list_form';
import TodoListHeader from './todo_list_header';

class TodoListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    this.props.rearrangeReduxEvents({
      fromIndex: result.source.index,
      toIndex: result.destination.index
    });

    const movedEvents = (result.source.index < result.destination.index)
      ? Object.values(this.event_rank_map)
        .slice(result.source.index + 1, result.destination.index + 1)
        .map(({ _id }) => _id)
      : Object.values(this.event_rank_map)
        .slice(result.destination.index, result.source.index)
        .map(({ _id }) => _id);

    this.props.asyncRearrangeEvents({
      focusedEvent: result.draggableId,
      fromRank: this.event_rank_map[result.source.index]._rank,
      toRank: this.event_rank_map[result.destination.index]._rank,
      movedEvents: movedEvents
    });
  };

  event_rank_map = {};

  componentDidMount() {
    this.props.asyncFetchEvents();
  }

  render() {
    return (
      <div className='todo-list-000'>
        {!this.props.activeGroup ? (
          <Redirect to='/todo' />
        ) : (
          <React.Fragment>
            <div className='any-list-comp-container-999'>
              <TodoListHeader
                activeGroup={this.props.activeGroup}
                asyncEditGroup={this.props.asyncEditGroup}
                asyncDeleteGroup={this.props.asyncDeleteGroup}
              />

              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId={this.props.active_groupId} type='EVENT_DND'>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      id='the-event-list-inside-container'
                      className='any-list-comp-the-list-999'
                    >
                      {this.props.events.map((event, i) => {
                        this.event_rank_map[i] = { _rank: event._rank, _id: event._id };

                        return (
                          <TodoListItem
                            key={i}
                            index={i}
                            event={event}
                            changeEventId={this.props.changeEventId}
                            hex_color={this.props.activeGroup.hex_color}
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
              title={this.state.title}
              active_groupId={this.props.active_groupId}
              events={this.props.events}
              asyncPostEvent={this.props.asyncPostEvent}
              setParentState={(abc) => {
                this.setState(abc);
              }}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ events }, props) => ({
  events: events.filter(({ _group }) => {
    return _group === props.active_groupId;
  })
  // }).sort((a, b) => a._rank > b._rank ? 1 : -1)
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