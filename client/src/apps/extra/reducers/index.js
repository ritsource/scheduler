import { combineReducers } from 'redux';

import progressbarReducer from './progressbar';

export default combineReducers({
	progressbar: progressbarReducer
});
