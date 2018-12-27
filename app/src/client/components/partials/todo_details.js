import React from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncEditEvent } from '../../actions/event_actions';

class TodoDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
    }
  }

  onDragEnd = (result) => {

  }

  componentWillReceiveProps(nextProps) {
    const activeEvent = nextProps.activeEvent;
    if (activeEvent && activeEvent.title !== this.state.title) {
      this.setState({ title: activeEvent.title });
    }
  }
  
  render() {
    const activeEvent = this.props.activeEvent;

    return (
      <div className='todo-details-comp-000 any-list-comp-container-999'>
        <form onSubmit={async (e) => {   
          e.preventDefault();
          await this.props.asyncEditEvent(activeEvent._id, { title: this.state.title });
          if (document) document.querySelector('#todo-details-input-inside-form').blur();
        }}>
          <input
            id='todo-details-input-inside-form'
            name='listname'
            autoComplete='off'
            className={`${(this.state.title === '') && 'todo-details-002-invalid-input'}`}
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
        </form>
        <div className=''>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={activeEvent._id} type='STEP_DND'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // id='the-event-list-inside-container'
                  className='any-list-comp-the-list-999'
                >
                  {/* {this.props.events.map((event, i) => {
                    this.event_rank_map[i] = { _rank: event._rank, _id: event._id };
                    // console.log(this.event_rank_map);

                    return (
                      <TodoListItem
                        key={i}
                        index={i}
                        event={event}
                        changeEventId={this.props.changeEventId}
                        hex_color={this.props.activeGroup.hex_color}
                      />
                    );
                  })} */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  asyncEditEvent: (abc, xyz) => dispatch(asyncEditEvent(abc, xyz))
});

export default connect(null, mapDispatchToProps)(TodoDetailsComp);