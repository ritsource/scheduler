import axios from 'axios';

export const asyncFetchProjects = () => async (dispatch) => {
  const response = await axios.get(`http://localhost:3000/api/group/all`);
  dispatch({ type: 'FETCH_PROJECTS', projects: response.data });
  
  return new Promise((resolve, reject) => {
    if (response.data) {
      resolve(response.data)
    } else {
      reject('Somenthing went wrong');
    }
  });
};