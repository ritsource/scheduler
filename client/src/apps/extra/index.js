import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import reducers from './reducers/index';
import ExtraRouter from './ExtraRouter';

const axiosGraphQL = axios.create({
	baseURL: '/graphql'
});

if (!!window) {
	window.axios = axios;
}

export const store = createStore(
	reducers,
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
			<div>{renderRoutes(ExtraRouter)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
