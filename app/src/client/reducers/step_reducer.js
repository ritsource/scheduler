import { ASYNC_FETCH_STEPS,
  ASYNC_POST_STEP,
  ASYNC_EDIT_STEP,
  ASYNC_PATCH_STEP_ISDONE,
  ASYNC_REARRANGE_STEPS
} from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_STEPS:
      return action.steps;
    case ASYNC_POST_STEP:
      return [ ...state, action.step ];
    case ASYNC_EDIT_STEP:
      return [ ...state.filter(({_id}) => _id !== action.step._id), action.step ];
    case ASYNC_PATCH_STEP_ISDONE:
      return [ ...state.filter(({_id}) => _id !== action.step._id), action.step ];
    case ASYNC_REARRANGE_STEPS:
      return action.steps;
    default:
      return state;
  }
}