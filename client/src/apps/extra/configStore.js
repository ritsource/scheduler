import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from './reducers/index';

export default (req) => {
	const axiosGraphQL = axios.create({
		baseURL: `http://api_server:5000/graphql`,
		headers: {
			cookie: req.get('cookie') || ''
		}
	});

	return createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosGraphQL)));
};
