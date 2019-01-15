import React from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncEditEvent, asyncPatchEvent_isDone } from '../../actions/event_actions';
import { asyncFetchSteps, asyncPostStep, asyncPatchStep_isDone, asyncEditStep, asyncDeleteStep, rearrangeReduxSteps, asyncRearrangeSteps } from '../../actions/step_actions';
import EventDetailsItem from './event_details_item';
import TodoListIndicator from './todo_list_indicator';

class EventDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      description: '',
      stepTitle: '',
    }
  }

  onDragEnd = (result) => {
    if (result.source.index === result.destination.index) return;

    this.props.rearrangeReduxSteps({
      fromIndex: result.source.index,
      toIndex: result.destination.index
    });

    const movedSteps = (result.source.index < result.destination.index)
      ? Object.values(this.step_rank_map)
        .slice(result.source.index + 1, result.destination.index + 1)
        .map(({ _id }) => _id)
      : Object.values(this.step_rank_map)
        .slice(result.destination.index, result.source.index)
        .map(({ _id }) => _id);

    this.props.asyncRearrangeSteps({
      focusedStep: result.draggableId,
      fromRank: this.step_rank_map[result.source.index]._rank,
      toRank: this.step_rank_map[result.destination.index]._rank,
      movedSteps: movedSteps
    });
  };

  step_rank_map = {};

  componentDidMount() {
    this.props.asyncFetchSteps();
  }

  componentWillReceiveProps(nextProps) {
    const activeEvent = nextProps.activeEvent;
    if (
      activeEvent &&
      activeEvent.title !== this.state.title || activeEvent.description !== this.state.description
    ) {
      this.setState({ title: activeEvent.title, description: activeEvent.description });
    }
  }
  
  render() {
    const activeEvent = this.props.activeEvent;
    
    return (
      <div className='todo-details-comp-000 any-list-comp-container-999'>
        <form onSubmit={async (e) => {   
          e.preventDefault();
          if (this.state.title !== '') {
            await this.props.asyncEditEvent(activeEvent._id, { title: this.state.title });
            if (document) document.querySelector('#todo-details-input-inside-form').blur();
          }
        }}>
          <TodoListIndicator
            _isDone={activeEvent._isDone}
            hex_color={this.props.hex_color}
            patchFunction={() => {
              this.props.asyncPatchEvent_isDone(
                activeEvent._id,
                !activeEvent._isDone
              );
            }}
          />
          <input
            id='todo-details-input-inside-form'
            name='listname'
            autoComplete='off'
            // className={`${(this.state.title === '') && 'todo-details-002-invalid-input'}`}
            className='awesome-app-transparent-input-999'
            value={this.state.title}
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
          />
        </form>
        {/* <div className=''> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={activeEvent._id} type='STEP_DND'>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                id='details-steps-list-inside-container'
                style={{ marginTop: '10px' }}
                className='any-list-comp-the-list-999'
              >
                {this.props.steps.map((step, i) => {
                  this.step_rank_map[i] = { _rank: step._rank, _id: step._id };

                  return (
                    <EventDetailsItem
                      key={i}
                      index={i}
                      step={step}
                      hex_color={this.props.hex_color}
                      asyncPatchStep_isDone={this.props.asyncPatchStep_isDone}
                      asyncEditStep={this.props.asyncEditStep}
                      asyncDeleteStep={this.props.asyncDeleteStep}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* </div> */}
        <form
          style={{  margin: '0px', marginTop: '10px' }}
          className='any-list-comp-bottom-form-999'
          onSubmit={async (e) =>  {
            e.preventDefault();
            await this.props.asyncPostStep({
              title: this.state.stepTitle,
              _event: activeEvent._id
            });
            this.setState({ stepTitle: '' });
            scrollToBottom('#details-steps-list-inside-container');
          }}
        >
          <input
            style={{ padding: '6px 0px' }}
            name='title'
            autoComplete='off'
            placeholder='+ Add Step'
            value={this.state.stepTitle}
            onChange={(e) => { this.setState({ stepTitle: e.target.value }) }}
          ></input>
          {this.state.stepTitle && (<button type='submit'>Add</button>)}
        </form>
        
        <p style={{
          marginTop: '10px',
          fontWeight: 'bold',
          color: this.props.hex_color
        }}>Description</p>
        <textarea
          style={{ marginTop: '10px' }}
          id='todo-details-textarea-for-description'
          placeholder='Add description..'
          value={this.state.description}
          onChange={(e) => {
            this.setState({ description: e.target.value })
          }}
        />
        <button
          style={{ marginTop: '10px', background: this.props.hex_color, color: 'white' }}
          className='todo-details-description-button-002'
          onClick={async () => {
            await this.props.asyncEditEvent(activeEvent._id, { description: this.state.description });
            if (document) document.querySelector('#todo-details-textarea-for-description').blur();
          }
        }>Save</button>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ steps }, props) => ({
  steps: steps.filter(({ _event }) => {
    return _event === props.activeEvent._id;
  // })
  }).sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncEditEvent: (abc, xyz) => dispatch(asyncEditEvent(abc, xyz)),
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