import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import authReducer from '../client/reducers/auth_reducer';
import appModeReducer from '../client/reducers/app_mode_reducer';
import sideBarReducer from '../client/reducers/side_bar_reducer';
import groupReducer from '../client/reducers/group_reducer';
import eventReducer from '../client/reducers/event_reducer';
import stepReducer from '../client/reducers/step_reducer';
import calendarMonthReducer from '../client/reducers/calendar_month_reducer';

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api`,
    headers: { cookie: req.get('cookie') || '' }
  });

  return createStore(
    combineReducers({
      auth: authReducer,
      appMode: appModeReducer,
      sideBar: sideBarReducer,
      groups: groupReducer,
      events: eventReducer,
      steps: stepReducer,
      calendarMonth: calendarMonthReducer
    }),
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};