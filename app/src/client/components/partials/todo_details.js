import React from "react";
import { connect } from 'react-redux';

import { asyncEditEvent } from '../../actions/event_actions';
import { asyncFetchSteps } from '../../actions/step_actions';
import TodoDetailsItem from './todo_details_item';

class TodoDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
    }
  }

  componentDidMount() {
    this.props.asyncFetchSteps();
  }

  componentWillReceiveProps(nextProps) {
    const activeEvent = nextProps.activeEvent;
    if (activeEvent && activeEvent.title !== this.state.title) {
      this.setState({ title: activeEvent.title });
    }
  }
  
  render() {
    const activeEvent = this.props.activeEvent;
    console.log(this.props.steps);
    
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
              console.log('step', step);
              
              return (
                <TodoDetailsItem key={i} step={step}/>
              );
            })}
          </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetailsComp);