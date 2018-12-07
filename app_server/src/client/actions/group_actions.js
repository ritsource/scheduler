import axios from 'axios';
import {
  ASYNC_FETCH_GROUPS,
  ASYNC_POST_GROUP,
  ASYNC_EDIT_GROUP,
  ASYNC_DELETE_GROUP
} from './_action_types';

// FETCH ALL GROUPS
export const asyncFetchGroups = () => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/api/group/all');
  dispatch({ type: ASYNC_FETCH_GROUPS, groups: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// POST GROUP
export const asyncPostGroup = (groupObj) => async (dispatch) => {
  const response = await axios.post(`http://localhost:5000/api/group/new`, { ...groupObj });
  dispatch({ type: ASYNC_POST_GROUP, group: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// EDIT GROUP
export const asyncEditGroup = (groupId, groupObj) => async (dispatch) => {
  const response = await axios.put(`http://localhost:5000/api/group/edit/${groupId}`, { ...groupObj });
  dispatch({ type: ASYNC_EDIT_GROUP, group: response.data });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}

// DELETE GROUP
export const asyncDeleteGroup = (groupId) => async (dispatch) => {
  const response = await axios.patch(`http://localhost:5000/api/group/delete/${groupId}`);
  dispatch({ type: ASYNC_DELETE_GROUP, _id: response.data._id });

  return new Promise((resolve, reject) => {
    if (response.data) resolve(response.data);
    else reject('Somenthing went wrong');
  });
}