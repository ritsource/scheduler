import { ASYNC_FETCH_EVENTS, ASYNC_POST_EVENT } from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_EVENTS:
      return action.events;
    case ASYNC_POST_EVENT:
      return [ ...state, action.event ];
    default:
      return state;
  }
}