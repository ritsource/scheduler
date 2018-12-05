import { ASYNC_TEST_ACTION } from '../actions/action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_TEST_ACTION:  
      return action.projects;
    default:
      return state;
  }
}