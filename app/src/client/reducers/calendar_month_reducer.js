import { SET_CALENDAR_MONTH_STATE } from '../actions/_action_types';

export default (state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
}, action) => {
  switch (action.type) {
    case SET_CALENDAR_MONTH_STATE:
      return { year: action.year, month: action.month };  
    default:
      return state;
  }
}