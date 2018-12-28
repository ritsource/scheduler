import { SET_CALENDAR_MONTH_STATE } from '../actions/_action_types';
import moment from 'moment';

export default (state = {
  year: parseInt(moment().format('YYYY')),
  month: parseInt(moment().format('M'))
}, action) => {
  switch (action.type) {
    case SET_CALENDAR_MONTH_STATE:
      return { year: action.year, month: action.month };  
    default:
      return state;
  }
}