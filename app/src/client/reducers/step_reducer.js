import { ASYNC_FETCH_STEPS,
  ASYNC_POST_STEP,
  ASYNC_EDIT_STEP,
  ASYNC_PATCH_STEP_ISDONE,
  ASYNC_DELETE_STEP,
  ASYNC_REARRANGE_STEPS,
  REARRANGE_REDUX_STEPS
} from '../actions/_action_types';

const sortByRank = arr => arr.sort((a, b) => a._rank > b._rank ? 1 : -1);

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_STEPS:
      return sortByRank(action.steps);

    case ASYNC_POST_STEP:
      return sortByRank([ ...state, action.step ]);

    case ASYNC_EDIT_STEP:
      return sortByRank([ ...state.filter(({_id}) => _id !== action.step._id), action.step ]);

    case ASYNC_PATCH_STEP_ISDONE:
      return sortByRank([ ...state.filter(({_id}) => _id !== action.step._id), action.step ]);

    case ASYNC_DELETE_STEP:
      return sortByRank([ ...state.filter(({_id}) => _id !== action._id) ]);

    case REARRANGE_REDUX_STEPS:
      const { fromIndex, toIndex } = action;  
      const temp = state[toIndex]._rank;

      const newArr = state.map((step, i) => {
        if (fromIndex < toIndex) {
          if (i > fromIndex && i <= toIndex) {
            step._rank = (step._rank - 1); 
          }
        } else {
          if (i >= toIndex && i < fromIndex) {
            step._rank = (step._rank + 1);
          }
        }
        return step;
      });
      newArr[fromIndex]._rank = temp;
      // console.log('_rank', newArr.map(({ _rank }) => _rank));
      // console.log('title', newArr.map(({ title }) => parseInt(title)));
      return sortByRank(newArr);

    case ASYNC_REARRANGE_STEPS:
      return sortByRank(action.steps);

    default:
      return state;
  }
}