import {
  ASYNC_FETCH_EVENTS,
  ASYNC_POST_EVENT,
  ASYNC_EDIT_EVENT,
  ASYNC_DELETE_EVENT,
  ASYNC_PATCH_EVENT_ISDONE,
  ASYNC_REARRANGE_EVENTS,
  REARRANGE_REDUX_EVENTS
} from '../actions/_action_types';

const sortByRank = arr => arr.sort((a, b) => a._rank > b._rank ? 1 : -1);

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_EVENTS:
      return action.events;

    case ASYNC_POST_EVENT:
      return [ ...state, action.event ];

    case ASYNC_EDIT_EVENT:
      return [ ...state.filter(({_id}) => _id !== action.event._id), action.event ];

    case ASYNC_DELETE_EVENT:
      return [ ...state.filter(({_id}) => _id !== action.eventId) ];

    case ASYNC_PATCH_EVENT_ISDONE:
      return [ ...state.filter(({_id}) => _id !== action.event._id), action.event ];

    case REARRANGE_REDUX_EVENTS:
      const { fromRank, toRank } = action;
      
      const tempRank = state[toRank]._rank;

      const newArr = state.map((event) => {
        const rank = event._rank;

        if (fromRank < toRank) {
          if (rank > fromRank && rank <= toRank) {
            event._rank = (event._rank - 1); 
          }
        } else {
          if (rank >= toRank && rank < fromRank) {
            event._rank = (event._rank + 1);
          }
        }
        
        return event;
      });

      newArr[fromRank]._rank = tempRank;
      
      return newArr;

    case ASYNC_REARRANGE_EVENTS:
      return action.events;
      
    default:
      return state;
  }
}