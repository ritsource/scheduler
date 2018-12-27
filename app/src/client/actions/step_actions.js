import { ASYNC_FETCH_STEPS_BYEVENT,
  ASYNC_POST_STEP,
  ASYNC_EDIT_STEP,
  ASYNC_PATCH_STEP_ISDONE,
  ASYNC_REARRANGE_STEPS
} from './_action_types';

// FETCH ALL STEPS
export const asyncFetchSteps_byEvent = () => async (dispatch, getState, api) => {
  const response = await api.get('/step/all');
  dispatch({ type: ASYNC_FETCH_STEPS_BYEVENT, steps: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// POST NEW STEP
export const asyncPostStep = (stepObj) => async (dispatch, getState, api) => {
  const response = await api.post('i/step/new', { ...stepObj });
  dispatch({ type: ASYNC_POST_STEP, step: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// EDIT A STEP
export const asyncEditStep = (stepId, stepObj) => async (dispatch, getState, api) => {
  const response = await api.put(`/step/edit/${stepId}`, { ...stepObj });
  dispatch({ type: ASYNC_EDIT_STEP, step: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// PATCH STEP _isDone
export const asyncPatchStep_isDone = (stepId, bool) => async (dispatch, getState, api) => {
  let response;
  if (bool) response = await api.patch(`/step/done/${stepId}`);
  else response = await api.patch(`/step/undo/${stepId}`);
  
  dispatch({ type: ASYNC_PATCH_STEP_ISDONE, step: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}


// ASYNC_REARRANGE_STEPS
export const asyncRearrangeSteps = (eventId, { focusedStep, fromRank, toRank, movedSteps }) => {
  return async (dispatch, getState, api) => {
    const response = await api.put(`/step/rearrange`, {
      focusedStep, fromRank, toRank, movedSteps, eventId
    });
    
    dispatch({ type: ASYNC_REARRANGE_STEPS, steps: response.data });
  
    return new Promise((resolve, reject) => {
      if (response.data) resolve(response.data);
      else reject('Somenthing went wrong');
    });
  };
};