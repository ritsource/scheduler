import {
  ASYNC_FETCH_EVENTS,
  ASYNC_POST_EVENT,
  ASYNC_EDIT_EVENT,
  ASYNC_PATCH_EVENT_ISDONE,
  ASYNC_REARRANGE_EVENTS,
  REARRANGE_REDUX_EVENTS,
} from './_action_types';

// FETCH ALL EVENTS
export const asyncFetchEvents = () => async (dispatch, getState, api) => {  
  const response = await api.get('/event/all');
  // console.log('data', response.data);
  dispatch({ type: ASYNC_FETCH_EVENTS, events: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// POST NEW EVENT
export const asyncPostEvent = (eventObj) => async (dispatch, getState, api) => {
  const response = await api.post('/event/new', { ...eventObj });
  dispatch({ type: ASYNC_POST_EVENT, event: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// EDIT NEW EVENT
export const asyncEditEvent = (eventId, eventObj) => async (dispatch, getState, api) => {
  const response = await api.put(`/event/edit/${eventId}`, { ...eventObj });
  dispatch({ type: ASYNC_EDIT_EVENT, event: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// PATCHEVENT _isDone
export const asyncPatchEvent_isDone = (eventId, bool) => async (dispatch, getState, api) => {
  let response;
  if (bool) response = await api.patch(`/event/done/${eventId}`);
  else response = await api.patch(`/event/undo/${eventId}`);
  
  dispatch({ type: ASYNC_PATCH_EVENT_ISDONE, event: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}


// ASYNC_REARRANGE_EVENTS
export const rearrangeReduxEvents = ({ fromIndex, toIndex, movedIndex }) => ({
  type: REARRANGE_REDUX_EVENTS,
  fromIndex,
  toIndex,
  movedIndex
});

export const asyncRearrangeEvents = ({ focusedEvent, fromRank, toRank, movedEvents }) => {
  return async (dispatch, getState, api) => {
    // console.log({ focusedEvent, fromRank, toRank, movedEvents });
    
    const response = await api.put(`/event/rearrange`, {
      focusedEvent, fromRank, toRank, movedEvents
    });
    
    dispatch({ type: ASYNC_REARRANGE_EVENTS, events: response.data });
  
    return new Promise((resolve, reject) => {
      if (response.data) resolve(response.data);
      else reject('Somenthing went wrong');
    });
  };
};