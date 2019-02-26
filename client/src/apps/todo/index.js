import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import TodoRouter from './TodoRouter';

const axiosGraphQL = axios.create({
	baseURL: '/graphql'
});

export const store = createStore(
	combineReducers({}),
	window.INITIAL_STATE,
	applyMiddleware(thunk.withExtraArgument(axiosGraphQL))
);

window.showStateDev = () => {
	console.log('getState', store.getState());
};

window.scrollToBottom = (selector) => {
	let _selector = document.querySelector(selector);
	let _scrollHeight = _selector.scrollHeight;
	_selector.scrollTop = _scrollHeight;
};

window.__isClient__ = true;

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(TodoRouter)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
