import { HANDE_APP_MODE } from '../actions/_action_types';

export default (state = null, action) => {
  switch (action.type) {
    case HANDE_APP_MODE:
      return action.num;
    default:
      return state;
  }
}