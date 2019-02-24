import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import ExtraRouter from './ExtraRouter';

const axiosInstance = axios.create({
	baseURL: '/api'
});

export const store = createStore(
	combineReducers({}),
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

window.showStateDev = () => {
	console.log('getState', store.getState());
};

window.scrollToBottom = (selector) => {
	let _selector = document.querySelector(selector);
	let _scrollHeight = _selector.scrollHeight;
	_selector.scrollTop = _scrollHeight;
};

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(ExtraRouter)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
