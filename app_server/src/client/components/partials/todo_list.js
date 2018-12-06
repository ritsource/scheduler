import React from 'react';
import { Link } from 'react-router-dom';

import TodoListItem from './todo_list_item';

class TodoListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: this.props.listTitle || '',
      newEventTitle: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listTitle !== this.state.listTitle) {
      this.setState({ listTitle: nextProps.listTitle });
    }
  }

  render() {
    const showFormButton = (this.props.listTitle !== this.state.listTitle && this.state.listTitle !== '');
    return (
      <div className='todo-list-000'>
        <div className='todo-list-001-content'>
          <div className='list-002-header'>
            <form onSubmit={(e) => {
              e.preventDefault();
            }}>
              <input
                name='listname'
                autoComplete='off'
                className={
                  `${(this.state.listTitle === '') && 'list-004-invalid-input'} ${!showFormButton && 'list-004-w-se-g-input'}`
                }
                value={this.state.listTitle}
                onChange={(e) => {
                  this.setState({ listTitle: e.target.value });
                }}
              />
              {showFormButton && (<button type='submit'>Save</button>)}
            </form>
            <button className='list-003-trash-button'><i class="far fa-trash-alt"></i></button>
          </div>

          {/* <div style={{ background: 'white' }} className='todo-list-001-dropzone' id={0}></div> */}
          <div className='todo-list-002-the-list'>
            {[
              ...this.props.events,
              ...this.props.events,
              ...this.props.events,
            ].map((event, i) => (
              <React.Fragment>
                <Link to={`/todo?group=${this.props.active_groupId}&event=${event._id}`} onClick={() => {
                  // this.props.changeEventId(event._id);
                }}>
                  <TodoListItem key={i} event={event} />
                </Link>
                {/* <div className='todo-list-001-dropzone' id={i + 1}></div> */}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form className='todo-list-001-new-task-form' onSubmit={(e) => {
          e.preventDefault();
        }}>
          {/* <div className='todo-list-002-form-add-indicator'>
            <i class="fas fa-plus"></i>
          </div> */}
          <input
            name='newEventTitle'
            autoComplete='off'
            className=''
            placeholder='+ Add a Task'
            value={this.state.newEventTitle}
            onChange={(e) => {
              this.setState({ newEventTitle: e.target.value });
            }}
          />
          {this.state.newEventTitle !== '' && (<button type='submit'>Add</button>)}
        </form>
      </div>
    )
  }
}

export default TodoListComp;