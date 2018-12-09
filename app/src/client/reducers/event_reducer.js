import {
  ASYNC_FETCH_EVENTS,
  ASYNC_POST_EVENT,
  ASYNC_PATCH_ISDONE
} from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_EVENTS:
      return action.events;
    case ASYNC_POST_EVENT:
      return [ ...state, action.event ];
    case ASYNC_PATCH_ISDONE:
    return [ ...state.filter(({_id}) => _id !== action.event._id), action.event ];
    default:
      return state;
  }
}