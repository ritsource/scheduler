import { START_PROGRESS_BAR, STOP_PROGRESS_BAR } from '../actions/action_types';

export default (state = false, action) => {
	switch (action.type) {
		case START_PROGRESS_BAR:
			return true;
		case STOP_PROGRESS_BAR:
			return false;
		default:
			return state;
	}
};
