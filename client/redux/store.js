import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
	lastUpdate: 0,
	light: false,
	count: 0
};

// ACTIONS
// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
// }

// export const startClock = dispatch => {
//   return setInterval(() => {
//     // Dispatch `TICK` every 1 second
//     dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
//   }, 1000)
// }

// export const incrementCount = () => dispatch => {
//   return dispatch({ type: actionTypes.INCREMENT })
// }

// export const decrementCount = () => dispatch => {
//   return dispatch({ type: actionTypes.DECREMENT })
// }

// export const resetCount = () => dispatch => {
//   return dispatch({ type: actionTypes.RESET })
// }

import authReducer from './reducers/auth_reducer';
import appModeReducer from './reducers/app_mode_reducer';
import sideBarReducer from './reducers/side_bar_reducer';
import groupReducer from './reducers/group_reducer';
import eventReducer from './reducers/event_reducer';
import stepReducer from './reducers/step_reducer';
import calendarMonthReducer from './reducers/calendar_month_reducer';

export function initializeStore(initialState = exampleInitialState) {
	return createStore(
		combineReducers({
			auth: authReducer,
			appMode: appModeReducer,
			sideBar: sideBarReducer,
			groups: groupReducer,
			events: eventReducer,
			steps: stepReducer,
			calendarMonth: calendarMonthReducer
		}),
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);
}
