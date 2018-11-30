import axios from 'axios';

export const asyncFetchProjects = () => async (dispatch) => {
  const response = await axios.get(`https://lame-ritwik.herokuapp.com/api/all_projects`);
  dispatch({ type: 'FETCH_PROJECTS', projects: response.data });
  
  return new Promise((resolve, reject) => {
    if (response.data) {
      resolve(response.data)
    } else {
      reject('Somenthing went wrong');
    }
  });
};