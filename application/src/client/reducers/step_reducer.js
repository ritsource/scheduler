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
      return [ ...state, action.step ];

    case ASYNC_EDIT_STEP:
      return [ ...state.filter(({_id}) => _id !== action.step._id), action.step ];

    case ASYNC_PATCH_STEP_ISDONE:
      return [ ...state.filter(({_id}) => _id !== action.step._id), action.step ];

    case ASYNC_DELETE_STEP:
      return [ ...state.filter(({_id}) => _id !== action._id) ];

    case REARRANGE_REDUX_STEPS:
      const { fromRank, toRank } = action;  
      // console.log(state[toRank]);
      
      const tempRank = state[toRank]._rank;

      const newArr = state.map((step) => {
        const rank = step._rank;

        if (fromRank < toRank) {
          if (rank > fromRank && rank <= toRank) {
            step._rank = (step._rank - 1); 
          }
        } else {
          if (rank >= toRank && rank < fromRank) {
            step._rank = (step._rank + 1);
          }
        }
        return step;
      });

      newArr[fromRank]._rank = tempRank;
      return newArr;

    case ASYNC_REARRANGE_STEPS:
      return action.steps;

    default:
      return state;
  }
}