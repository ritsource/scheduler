import React from "react";
import { connect } from 'react-redux';

import { asyncEditEvent } from '../../actions/event_actions';
import { asyncFetchSteps, asyncPostStep } from '../../actions/step_actions';
import TodoDetailsItem from './todo_details_item';

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
          <div className='any-list-comp-the-list-999'>
            {this.props.steps.map((step, i) => {              
              return (
                <TodoDetailsItem key={i} step={step}/>
              );
            })}
          </div>
        {/* </div> */}
        <form
          onSubmit={async (e) =>  {
            e.preventDefault();
            await this.props.asyncPostStep({
              title: this.state.stepTitle,
              _event: activeEvent._id
            });
            this.setState({ stepTitle: '' })
          }}
        >
          <input
            value={this.state.stepTitle}
            onChange={(e) => { this.setState({ stepTitle: e.target.value }) }}
          ></input>
          <button type='button' onClick={() => { this.setState({ stepTitle: '' }) }}>X</button>
        </form>
        <div>
          <textarea
            id='todo-details-textarea-for-description'
            value={this.state.description}
            onChange={(e) => {
              this.setState({ description: e.target.value })
            }}
          />
          {(activeEvent.description !== this.state.description) && (
            <button onClick={async () => {
              await this.props.asyncEditEvent(activeEvent._id, { description: this.state.description });
              if (document) document.querySelector('#todo-details-textarea-for-description').blur();
            }}>Save</button>
          )}
        </div>
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
  asyncPostStep: (abc) => dispatch(asyncPostStep(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailsComp);