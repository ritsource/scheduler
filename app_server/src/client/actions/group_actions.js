import axios from 'axios';
import { ASYNC_FETCH_GROUPS } from './_action_types';

export const asyncFetchGroups = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/group/all');
  // console.log(response.data);
  dispatch({ type: ASYNC_FETCH_GROUPS, groups: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}