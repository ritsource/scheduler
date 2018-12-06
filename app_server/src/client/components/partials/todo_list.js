import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';

import { asyncPostEvent } from '../../actions/event_actions';
import { asyncEditGroup, asyncDeleteGroup } from '../../actions/group_actions';
import TodoListItem from './todo_list_item';

class TodoListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: this.props.listTitle || '',
      title: '',
    }
    this.listRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listTitle !== this.state.listTitle) {
      this.setState({ listTitle: nextProps.listTitle });
      this.setState({ title: '' });
    }
  }

  render() {
    const showFormButton = (this.props.listTitle !== this.state.listTitle && this.state.listTitle !== '');
    return (
      <div className='todo-list-000'>
        {!this.props.listTitle ? (
          <Redirect to='/todo' />
        ) : (
          <React.Fragment>
          <div className='todo-list-001-content'>
            <div className='list-002-header'>
              <form onSubmit={(e) => {
                e.preventDefault();
                this.props.asyncEditGroup(
                  this.props.active_groupId,
                  { title: this.state.listTitle }
                );
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
              <button
                className='list-003-trash-button'
                onClick={() => {
                  this.props.asyncDeleteGroup(this.props.active_groupId).then(() => {
                    // this.props.history.push('/todo');
                    // this.props.pushToTodo();
                  })
                }}
              ><i class="far fa-trash-alt"></i></button>
            </div>

            {/* <div style={{ background: 'white' }} className='todo-list-001-dropzone' id={0}></div> */}
            <div className='todo-list-002-the-list' ref={this.listRef} >
              {this.props.events.map((event, i) => (
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
            this.props.asyncPostEvent({
              title: this.state.title,
              _group: this.props.active_groupId,
              _rank: (this.props.events.length + 1)
            }).then(() => {
              this.setState({ title: '' });
              scrollToBottom('.todo-list-002-the-list');
            });
          }}>
            <input
              name='title'
              autoComplete='off'
              className=''
              placeholder='+ Add a Task'
              value={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
            {this.state.title !== '' && (
              <button type='submit'>Add</button>
            )}
          </form>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ events }, props) => ({
  events: events.filter(({ _group }) => {
    return _group === props.active_groupId;
  }).sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncPostEvent: (abc) => dispatch(asyncPostEvent(abc)),
  asyncEditGroup: (abc, xyz) => dispatch(asyncEditGroup(abc, xyz)),
  asyncDeleteGroup: (abc) => dispatch(asyncDeleteGroup(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComp);