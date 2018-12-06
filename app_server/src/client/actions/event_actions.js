import axios from 'axios';
import { ASYNC_FETCH_EVENTS } from './_action_types';

export const asyncFetchEvents = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/event/all');
  // console.log('data', response.data);
  dispatch({ type: ASYNC_FETCH_EVENTS, events: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}