import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { asyncPostEvent } from '../../actions/event_actions';
import { asyncEditGroup, asyncDeleteGroup } from '../../actions/group_actions';
import TodoListItem from './todo_list_item';
import TodoListDropzone from './todo_list_dropzone';
import TodoListForm from './todo_list_form';
import TodoListHeader from './todo_list_header';

class TodoListComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTitle: this.props.listTitle || '',
      title: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listTitle !== this.state.listTitle) {
      this.setState({ listTitle: nextProps.listTitle });
      // this.setState({ title: '' });
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
              <TodoListHeader
                listTitle={this.state.listTitle}
                showFormButton={showFormButton}
                active_groupId={this.props.active_groupId}
                asyncEditGroup={this.props.asyncEditGroup}
                asyncDeleteGroup={this.props.asyncDeleteGroup}
                setParentState={(abc) => {
                  this.setState(abc);
                }}
              />

              <div className='todo-list-002-the-list' ref={this.listRef} >
                {this.props.events.map((event, i) => (
                  <React.Fragment>
                    <TodoListDropzone index={i}/>
                    
                    <Link to={`/todo?group=${this.props.active_groupId}&event=${event._id}`} onClick={() => {
                      // this.props.changeEventId(event._id);
                    }}>
                      <TodoListItem key={i} event={event} handleListItemDrop={() => { console.log('Dropped!!') }}/>
                    </Link>
                  </React.Fragment>
                ))}

                <TodoListDropzone index={this.props.events.length} last={true}/>
              </div>
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
  }).sort((a, b) => a._rank > b._rank ? 1 : -1)
});

const mapDispatchToProps = (dispatch) => ({
  asyncPostEvent: (abc) => dispatch(asyncPostEvent(abc)),
  asyncEditGroup: (abc, xyz) => dispatch(asyncEditGroup(abc, xyz)),
  asyncDeleteGroup: (abc) => dispatch(asyncDeleteGroup(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComp);