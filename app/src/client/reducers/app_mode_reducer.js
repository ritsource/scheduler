import { HANDE_APP_MODE } from '../actions/_action_types';

export default (state = 2, action) => { // 2 For Login page
  switch (action.type) {
    case HANDE_APP_MODE:
      return action.num;
    default:
      return state;
  }
}