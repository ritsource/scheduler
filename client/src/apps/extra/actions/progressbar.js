import { START_PROGRESS_BAR, STOP_PROGRESS_BAR } from './action_types';

export const startProgressbar = (dispatch) => {
	dispatch({ type: START_PROGRESS_BAR });
};

export const stopProgressbar = (dispatch) => {
	dispatch({ type: STOP_PROGRESS_BAR });
};
