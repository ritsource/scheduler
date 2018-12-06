import axios from 'axios';
import {
  ASYNC_FETCH_EVENTS,
  ASYNC_POST_EVENT,
  ASYNC_PATCH_ISDONE
} from './_action_types';

// FETCH ALL EVENTS
export const asyncFetchEvents = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/event/all');
  // console.log('data', response.data);
  dispatch({ type: ASYNC_FETCH_EVENTS, events: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// POST NEW EVENT
export const asyncPostEvent = (eventObj) => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/api/event/new', { ...eventObj });
  dispatch({ type: ASYNC_POST_EVENT, event: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// PATCHEVENT _isDone
export const asyncPatch_isDone = (eventId, bool) => async (dispatch) => {
  let response;
  if (bool) response = await axios.patch(`http://localhost:5000/api/event/done/${eventId}`);
  else response = await axios.patch(`http://localhost:5000/api/event/undo/${eventId}`);
  
  dispatch({ type: ASYNC_PATCH_ISDONE, event: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

