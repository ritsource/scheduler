import { matchRoutes } from 'react-router-config';
import renderer from './renderer';
import getApolloClient from './graphql/apollo-for-server';

import ExtraRouter from './apps/extra/ExtraRouter';
import TodoRouter from './apps/todo/TodoRouter';

export const getExtraContent = (req) => {
	const context = { req };
	const client = getApolloClient(req);
	const jsfile = 'extra.js';

	return renderer(req, ExtraRouter, client, context, jsfile);
};

export const getTodoContent = (req) => {
	const context = { req };
	const client = getApolloClient(req);
	const jsfile = 'todo.js';

	console.log('LOL 1');

	const promises = matchRoutes(TodoRouter, req.path).map(({ route }) => {
		console.log('LOL 2');
		return route.loadData ? route.loadData(client, context) : null;
	});

	console.log('LOL 3');

	const html = renderer(req, TodoRouter, client, context, jsfile);

	console.log('LOL 4');

	return { promises, html };
};

// export const getExtraContent = (req) => {
// 	const store = configExtraStore(req);
// 	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
// 	const jsfile = 'extra.js';

// 	return renderer(req, ExtraRouter, store, context, jsfile);
// };
