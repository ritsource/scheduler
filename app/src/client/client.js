import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import AppRoutes from './app_routes';

import authReducer from './reducers/auth_reducer';
import appModeReducer from './reducers/app_mode_reducer';
import sideBarReducer from './reducers/side_bar_reducer';
import groupReducer from './reducers/group_reducer';
import eventReducer from './reducers/event_reducer';

const axiosInstance = axios.create({
  baseURL: '/api'
});

const store = createStore(
  combineReducers({
    auth: authReducer,
    appMode: appModeReducer,
    sideBar: sideBarReducer,
    groups: groupReducer,
    events: eventReducer
  }),
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

window.showStateDev = () => {
  console.log('getState', store.getState());
}

window.scrollToBottom = (selector) => {
  let _selector = document.querySelector(selector);
  let _scrollHeight = _selector.scrollHeight;
  _selector.scrollTop = _scrollHeight;
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(AppRoutes)}</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));