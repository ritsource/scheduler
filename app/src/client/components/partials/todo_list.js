import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { asyncPostEvent, asyncRearrangeEvents } from '../../actions/event_actions';
import { asyncEditGroup, asyncDeleteGroup } from '../../actions/group_actions';
import TodoListItem from './todo_list_item';
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

  onDragEnd = (result) => {
    
  };

  // x = {
  //   draggableId: 'objectId',
  //   source: {
  //     index: 0
  //   },
  //   destination: {
  //     index: 1
  //   }
  // }

  changeEventId = (eventId) => {
    const history = createBrowserHistory();
    history.push(`/todo?group=${this.props.active_groupId}&event=${eventId}`);
  };

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

              <DragDropContext
                onDragEnd={this.onDragEnd}
              >
                <Droppable droppableId="droppable-1" type="PERSON">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                      {...provided.droppableProps}
                      className='todo-list-002-the-list'
                    >
                      {this.props.events.map((event, i) => {
                        return (
                          <TodoListItem
                            key={i}
                            index={i}
                            event={event}
                            changeEventId={this.changeEventId}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
  asyncRearrangeEvents: (abc) => dispatch(asyncRearrangeEvents(abc)),
  asyncEditGroup: (abc, xyz) => dispatch(asyncEditGroup(abc, xyz)),
  asyncDeleteGroup: (abc) => dispatch(asyncDeleteGroup(abc))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComp);