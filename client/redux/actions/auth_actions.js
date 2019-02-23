import { ASYNC_FETCH_USER, ASYNC_EDIT_USER } from './_action_types';

export const asyncFetchUser = () => async (dispatch, getState, api) => {
  const response = await api.get('/current_user');
  if (response.data) dispatch({ type: ASYNC_FETCH_USER, auth: response.data });
  else dispatch({ type: ASYNC_FETCH_USER, auth: false });
};

export const asyncAddCustomColor = (new_color) => async (dispatch, getState, api) => {
  const response = await api.post('/add_custom_colors', { new_color });
    
  if (response.data) dispatch({ type: ASYNC_FETCH_USER, auth: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
};

