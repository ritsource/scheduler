import React from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncDeleteEvent, asyncEditEvent, asyncEditEventDate, asyncPatchEvent_isDone } from '../../../actions/event_actions';
import { asyncFetchSteps, asyncPostStep, asyncPatchStep_isDone, asyncEditStep, asyncDeleteStep, rearrangeReduxSteps, asyncRearrangeSteps } from '../../../actions/step_actions';
import EventDetailsItem from './event_details_item';
import EventDetailsHeaderComp from './event_details_header';
import EventDetailsButtonsComp from './event_details_buttons';

class EventDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title || ' ',
      description: '',
      stepTitle: '',
      dFromAsync: false,
      dToAsync: false,
      groupAsync: false,
      askforDelete: false,
      askforDelete_close: false
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

  handleEventDelete = async (id) => {
    await this.props.asyncDeleteEvent(id);
  }

  componentDidMount() {
    this.props.asyncFetchSteps();
  }

  componentWillReceiveProps(nextProps) {
    const event = nextProps.event;
    if (
      event &&
      event.title !== this.state.title || event.description !== this.state.description
    ) {
      this.setState({
        title: event.title,
        // date_from: event.date_from,
        // date_to: event.date_to,
        description: event.description
      });
    }
  }
  
  render() {
    const { event, toggleEventDetails } = this.props;
    
    return (
      <div className='todo-details-comp-000 any-list-comp-container-999'>
        <EventDetailsHeaderComp
          event={event}
          hex_color={this.props.hex_color}
          title={this.state.title}
          setParentState={(obj) => this.setState(obj)}
          asyncEditEvent={this.props.asyncEditEvent}
          asyncPatchEvent_isDone={this.props.asyncPatchEvent_isDone}
        />

        {/* <div style={{ padding: '0px' }}> */}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={event._id} type='STEP_DND'>
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

          <form style={{ marginTop: '10px' }}
            className='any-list-comp-bottom-form-999'
            onSubmit={async (e) =>  {
              e.preventDefault();
              await this.props.asyncPostStep({
                title: this.state.stepTitle,
                _event: event._id
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
            {this.state.stepTitle && (
              <button name='Add Step' className='any-list-comp-form-submit-btn-003' type='submit'>Add</button>
            )}
          </form>
        {/* </div> */}

          <EventDetailsButtonsComp
            { ...this.state }
            { ...this.props }
            setParentState={(obj) => this.setState(obj)}
            handleEventDelete={this.handleEventDelete}
          />
      </div>
    );
  }
}

const mapStateToProps = ({ steps, groups }, props) => ({
  groups,
  steps: steps.filter(({ _event }) => {
    return _event === props.event._id;
  // })
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