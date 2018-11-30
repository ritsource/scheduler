import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import projectReducer from '../client/reducers/project_reducer';
import textReducer from '../client/reducers/text_reducer';

export default () => {
  return createStore(
    combineReducers({
      projects: projectReducer,
      texts: textReducer
    }),
    {},
    applyMiddleware(thunk)
  );
};