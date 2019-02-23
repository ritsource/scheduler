import { ASYNC_FETCH_USER, ASYNC_EDIT_USER } from '../actions/_action_types';

export default (state = null, action) => {
  switch (action.type) {
    case ASYNC_FETCH_USER:
      return action.auth;
    case ASYNC_EDIT_USER:
      return action.auth;
    default:
      return state;
  }
}