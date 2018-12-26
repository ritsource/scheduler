import {
  ASYNC_FETCH_GROUPS,
  ASYNC_POST_GROUP,
  ASYNC_EDIT_GROUP,
  ASYNC_DELETE_GROUP
} from './_action_types';

// FETCH ALL GROUPS
export const asyncFetchGroups = () => async (dispatch, getState, api) => {
  const response = await api.get('/group/all');
  dispatch({ type: ASYNC_FETCH_GROUPS, groups: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// POST GROUP
export const asyncPostGroup = (groupObj) => async (dispatch, getState, api) => {
  const response = await api.post(`/group/new`, { ...groupObj });
  dispatch({ type: ASYNC_POST_GROUP, group: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// EDIT GROUP
export const asyncEditGroup = (groupId, groupObj) => async (dispatch, getState, api) => {
  const response = await api.put(`/group/edit/${groupId}`, { ...groupObj });
  dispatch({ type: ASYNC_EDIT_GROUP, group: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// DELETE GROUP
export const asyncDeleteGroup = (groupId) => async (dispatch, getState, api) => {
  const response = await api.patch(`/group/delete/${groupId}`);
  dispatch({ type: ASYNC_DELETE_GROUP, _id: response.data._id });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}