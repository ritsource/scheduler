import { HANDE_APP_MODE } from './_action_types';

export const handleAppMode = (num) => (dispatch) => {
  dispatch({ type: HANDE_APP_MODE, num });
  return new Promise((resolve, reject) => { resolve(); });
};


