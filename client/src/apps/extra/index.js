import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import ExtraRouter from './ExtraRouter';

if (!!window) {
	window.axios = axios;
}

window.__isClient__ = true;

ReactDOM.hydrate(
	<BrowserRouter>
		<div>{renderRoutes(ExtraRouter)}</div>
	</BrowserRouter>,
	document.querySelector('#root')
);
