import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
// import { DragDropContextProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import AppRoutes from './app_routes';
import appModeReducer from './reducers/app_mode_reducer';
import sideBarReducer from './reducers/side_bar_reducer';
import groupReducer from './reducers/group_reducer';
import eventReducer from './reducers/event_reducer';

const store = createStore(
  combineReducers({
    appMode: appModeReducer,
    sideBar: sideBarReducer,
    groups: groupReducer,
    events: eventReducer
  }),
  window.INITIAL_STATE,
  applyMiddleware(thunk)
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
      {/* <DragDropContextProvider backend={HTML5Backend}> */}
        <div>{renderRoutes(AppRoutes)}</div>
      {/* </DragDropContextProvider> */}
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));