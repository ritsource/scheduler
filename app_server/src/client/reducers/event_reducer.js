import { ASYNC_FETCH_EVENTS } from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_EVENTS:
      return action.events;
    default:
      return state;
  }
}