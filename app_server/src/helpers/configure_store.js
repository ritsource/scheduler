import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import appModeReducer from '../client/reducers/app_mode_reducer';
import sideBarReducer from '../client/reducers/side_bar_reducer';
import groupReducer from '../client/reducers/group_reducer';
import eventReducer from '../client/reducers/event_reducer';

export default () => {
  return createStore(
    combineReducers({
      appMode: appModeReducer,
      sideBar: sideBarReducer,
      groups: groupReducer,
      events: eventReducer
    }),
    {},
    applyMiddleware(thunk)
  );
};