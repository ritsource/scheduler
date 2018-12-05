import { ASYNC_FETCH_GROUPS } from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_GROUPS:
      return action.groups;
    default:
      return state;
  }
}