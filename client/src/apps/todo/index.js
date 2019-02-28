import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ApolloProvider } from 'react-apollo';

import client from '../../graphql/apollo-for-client';
import TodoRouter from './TodoRouter';

window.scrollToBottom = (selector) => {
	let _selector = document.querySelector(selector);
	let _scrollHeight = _selector.scrollHeight;
	_selector.scrollTop = _scrollHeight;
};

window.__isClient__ = true;

ReactDOM.hydrate(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<div>{renderRoutes(TodoRouter)}</div>
		</BrowserRouter>
	</ApolloProvider>,
	document.querySelector('#root')
);
