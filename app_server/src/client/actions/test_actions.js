import axios from 'axios';
import { ASYNC_TEST_ACTION } from './action_types';

export const asyncTestAction = () => async (dispatch) => {
  const response = await axios.get('https://lame-ritwik.herokuapp.com/api/all_projects');
  dispatch({ type: ASYNC_TEST_ACTION, projects: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) {
      resolve(response.data)
    } else {
      reject('Somenthing went wrong');
    }
  });
};