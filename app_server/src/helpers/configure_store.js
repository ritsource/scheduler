import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import testReducer from '../client/reducers/test_reducer';

export default () => {
  return createStore(
    combineReducers({
      projects: testReducer
    }),
    {},
    applyMiddleware(thunk)
  );
};