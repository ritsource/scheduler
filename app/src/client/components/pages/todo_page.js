import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
// import ReactSVG from 'react-svg';
import { Redirect } from 'react-router-dom';

import { handleAppMode } from '../../actions/app_mode_actions';
import TodoSidebarComp from '../partials/todo/todo_sidebar';
import TodoListComp from '../partials/todo/todo_list';
import EventDetailsComp from '../reusables/event_details/event_details';

export const TodoPage = (props) => {
  const [ groupId, setGroupId ] = useState('');
  const [ eventId, setEventId ] = useState('');

  useEffect(() => {
    props.handleAppMode(1);

    if (!!window) {
      const urlParams = new URLSearchParams(window.location.search);
      setGroupId(urlParams.get('group') || '');
      setEventId(urlParams.get('event') || '');

      if (!urlParams.get('group') && props.groups[0]) {
        setGroupId(props.groups[0]._id);
      }
    }
    
    return () => props.handleAppMode(2);
  }, []);

  const changeGroupId = (id) => {
    setGroupId(id);
    setEventId('');
    const history = createBrowserHistory();
    history.push(`/todo?group=${id}`);    
  }

  const changeEventId = (id) => {
    // setGroupId('');
    setEventId(id);
    const history = createBrowserHistory();
    history.push(`/todo?group=${groupId}&event=${id}`);
  }

  const activeGroup = props.groups.find(({ _id }) => (_id === groupId));
  const activeEvent = props.events.find(({ _id }) => (_id === eventId));

  return (
    <div className='todo-page-000'>
      {props.auth ? (
        <React.Fragment>
          <TodoSidebarComp
            changeGroupId={changeGroupId}
            active_groupId={groupId}
            visible={props.sideBar}
          />
          <div className='todo-page-001-content'>
            {!groupId ? (
              // <h2><ReactSVG src='/logo.svg'/>Loading...</h2>
              <h2>Loading...</h2>
            ) : (
              <TodoListComp
                active_groupId={groupId}
                activeGroup={activeGroup}
                changeEventId={changeEventId}
              />
            )}
          </div>
          {activeEvent && (
            <EventDetailsComp
              event={activeEvent}
              hex_color={activeGroup.hex_color}
              closeEventDetails={() => {
                setEventId('');
                const history = createBrowserHistory();
                history.push(`/todo?group=${groupId}`);
              }}
            />
          )}
        </React.Fragment>
      ) : (
        <Redirect to='/login' />
      )}
    </div>
  );

}

const mapStateToProps = ({ auth, groups, events, sideBar }) => ({ auth, groups, events, sideBar });

const mapDispatchToProps = (dispatch) => ({
  handleAppMode: (x) => dispatch(handleAppMode(x))
});

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(TodoPage),
  loadData: function (store) {
    return store.dispatch(handleAppMode(1));
  }
};