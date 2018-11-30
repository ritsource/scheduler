import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';

import AppRouter from './app_router';
import projectReducer from './reducers/project_reducer';
import textReducer from './reducers/text_reducer';

const store = createStore(
  combineReducers({
    projects: projectReducer,
    texts: textReducer
  }),
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

window.showStateDev = () => {
  console.log('getState', store.getState());
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(AppRouter)}</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));