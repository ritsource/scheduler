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
      return sortByRank(action.groups);

    case ASYNC_POST_GROUP:
      return sortByRank([ ...state, action.group ]);

    case ASYNC_EDIT_GROUP:
      return sortByRank([ ...state.filter(({_id}) => _id !== action.group._id), action.group ]);

    case ASYNC_DELETE_GROUP:
      return sortByRank(state.filter(({_id}) => _id !== action._id));

    case REARRANGE_REDUX_GROUPS:
    const { fromIndex, toIndex } = action;
    // console.log({ fromIndex, toIndex });      
    const temp = state[toIndex]._rank;
    const newArr = state.map((group, i) => {
      if (fromIndex < toIndex) {
        if (i > fromIndex && i <= toIndex) {
          group._rank = (group._rank - 1); 
        }
      } else {
        if (i >= toIndex && i < fromIndex) {
          group._rank = (group._rank + 1);
        }
      }
      return group;
    });
    newArr[fromIndex]._rank = temp;
    // console.log('_rank', newArr.map(({ _rank }) => _rank));
    // console.log('title', newArr.map(({ title }) => parseInt(title)));
    return sortByRank(newArr);

    case ASYNC_REARRANGE_GROUPS: 
      return sortByRank(action.groups);

    default:
      return state;
  }
}