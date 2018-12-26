import { ASYNC_FETCH_USER } from './_action_types';

export const asyncFetchUser = () => async (dispatch, getState, api) => {
  const response = await api.get('/current_user');
  if (response.data) dispatch({ type: ASYNC_FETCH_USER, auth: response.data });
  else dispatch({ type: ASYNC_FETCH_USER, auth: false });
};