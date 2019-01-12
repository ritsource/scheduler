import { TOGGLE_SIDE_BAR, SETUP_SIDE_BAR } from '../actions/_action_types';

export default (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR:
      if (window) window.localStorage.setItem('hiddenSidebar', !state);
      return !state;
    case SETUP_SIDE_BAR:
      let instState = state;
      if (window) {
        instState = JSON.parse(window.localStorage.getItem('hiddenSidebar'));
        // console.log(instState);
        if (instState === null) {
          // console.log(instState);
          window.localStorage.setItem('hiddenSidebar', state);
          return state;
        }
      }
      // console.log(instState);
      return instState;
    default:
      return state;
  }
}