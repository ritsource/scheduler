import React from "react";
import { connect } from 'react-redux';

import { asyncEditEvent, asyncPatchEvent_isDone } from '../../actions/event_actions';
import { asyncFetchSteps, asyncPostStep, asyncPatchStep_isDone, asyncEditStep } from '../../actions/step_actions';
import TodoDetailsItem from './todo_details_item';
import TodoListIndicator from './todo_list_indicator';

class TodoDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      description: '',
      stepTitle: '',
    }
  }

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
          await this.props.asyncEditEvent(activeEvent._id, { title: this.state.title });
          if (document) document.querySelector('#todo-details-input-inside-form').blur();
        }}>
          <TodoListIndicator
            _isDone={activeEvent._isDone}
            hex_color={this.props.hex_color}
            patchFunction={() => {
              this.props.asyncPatchEvent_isDone(
                this.props.activeEvent._id,
                !this.props.activeEvent._isDone
              );
            }}
          />
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
        {/* <div className=''> */}
          <div
            id='details-steps-list-inside-container'
            style={{ marginTop: '10px' }}
            className='any-list-comp-the-list-999'
          >
            {this.props.steps.map((step, i) => {              
              return (
                <TodoDetailsItem
                  key={i}
                  step={step}
                  hex_color={this.props.hex_color}
                  asyncPatchStep_isDone={this.props.asyncPatchStep_isDone}
                  asyncEditStep={this.props.asyncEditStep}
                />
              );
            })}
          </div>
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
            style={{
              // '::placeholder': {
              //   color: this.props.hex_color
              // },
              padding: '6px 0px'
            }}
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
          style={{ marginTop: '10px', paddingBottom: '12px', background: this.props.hex_color }}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailsComp);