import { TOGGLE_SIDE_BAR } from '../actions/_action_types';

export default (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR:
      return !state;  
    default:
      return state;
  }
}