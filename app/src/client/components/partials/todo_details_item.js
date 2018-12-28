import React from 'react';

import TodoListIndicator from './todo_list_indicator';

class TodoDetailsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.step.title || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.step.title !== this.state.title) {
      this.setState({ title: nextProps.step.title });
    }
  }

  render() {
    const thisStep = this.props.step;
    return (
      // <div>
        <div className='todo-details-item-comp-000'>
          <TodoListIndicator
            _isDone={thisStep._isDone}
            hex_color={this.props.hex_color}
            patchFunction={() => {
              this.props.asyncPatchStep_isDone(thisStep._id, !thisStep._isDone);
            }}
          />
          <form onSubmit={async (e) => {
            e.preventDefault();
            await this.props.asyncEditStep(thisStep._id, { title: this.state.title });
            if (document) document.querySelector(`#todo-details-item-input-inside-form-${thisStep._id}`).blur();
          }}>
            <input
              style={thisStep._isDone ? { textDecoration: 'line-through' } : {}}
              id={`todo-details-item-input-inside-form-${thisStep._id}`}
              value={this.state.title}
              onChange={(e) => { this.setState({ title: e.target.value }) }}
              onBlur={async () => {
                await this.props.asyncEditStep(thisStep._id, { title: this.state.title });
              }}
            />
          </form>
        </div>
      // </div>
    );
  }
}

export default TodoDetailsItem;