import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import authReducer from '../client/reducers/auth_reducer';
import appModeReducer from '../client/reducers/app_mode_reducer';
import sideBarReducer from '../client/reducers/side_bar_reducer';
import groupReducer from '../client/reducers/group_reducer';
import eventReducer from '../client/reducers/event_reducer';

export default (req) => {
  const host = req.get('host');
  // console.log('host', host);
  
  const axiosInstance = axios.create({
    baseURL: `http://${host}/api`,
    headers: { cookie: req.get('cookie') || '' }
  });

  return createStore(
    combineReducers({
      auth: authReducer,
      appMode: appModeReducer,
      sideBar: sideBarReducer,
      groups: groupReducer,
      events: eventReducer
    }),
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};