import {
  ASYNC_FETCH_GROUPS,
  ASYNC_POST_GROUP,
  ASYNC_EDIT_GROUP,
  ASYNC_DELETE_GROUP,
  ASYNC_REARRANGE_GROUPS,
  REARRANGE_REDUX_GROUPS
} from '../actions/_action_types';

const sortByRank = arr => arr.sort((a, b) => a._rank > b._rank ? 1 : -1);

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_GROUPS:
      return action.groups;

    case ASYNC_POST_GROUP:
      return [ ...state, action.group ];

    case ASYNC_EDIT_GROUP:
      return [ ...state.filter(({_id}) => _id !== action.group._id), action.group ];

    case ASYNC_DELETE_GROUP:
      return [ ...state.filter(({_id}) => _id !== action._id) ];

    case REARRANGE_REDUX_GROUPS:
    const { fromRank, toRank} = action;     
    const tempRank = state[toRank]._rank;

    const newArr = state.map((group) => {
      const rank = group._rank;

      if (fromRank < toRank) {
        if (rank > fromRank && rank <= toRank) {
          group._rank = (group._rank - 1); 
        }
      } else {
        if (rank >= toRank && rank < fromRank) {
          group._rank = (group._rank + 1);
        }
      }
      return group;
    });

    newArr[fromRank]._rank = tempRank;
    return newArr;

    case ASYNC_REARRANGE_GROUPS: 
      return action.groups;

    default:
      return state;
  }
}