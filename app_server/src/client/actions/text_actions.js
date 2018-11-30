import axios from 'axios';

export const asyncFetchTexts = () => async (dispatch) => {
  const response = await axios.get(`https://lame-ritwik.herokuapp.com/api/all_texts`);
  dispatch({ type: 'FETCH_TEXTS', texts: response.data })

  return new Promise((resolve, reject) => {
    if (response.data) {
      resolve(response.data)
    } else {
      reject('Somenthin went wrong');
    }
  });
};