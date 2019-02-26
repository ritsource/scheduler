import { matchRoutes } from 'react-router-config';
import renderer from './renderer';

import ExtraRouter from './apps/extra/ExtraRouter';
import configExtraStore from './apps/extra/configStore';

export const getExtraContent = (req) => {
	const store = configExtraStore(req);
	const context = { req };
	const jsfile = 'extra.js';

	return renderer(req, ExtraRouter, store, context, jsfile);
};

import TodoRouter from './apps/todo/TodoRouter';
import configTodoStore from './apps/todo/configStore';

export const getTodoContent = (req) => {
	const store = configTodoStore(req);
	const context = { req };
	const jsfile = 'todo.js';

	console.log('LOL 1');

	const promises = matchRoutes(TodoRouter, req.path).map(({ route }) => {
		console.log('LOL 2');
		return route.loadData ? route.loadData(store, context) : null;
	});

	console.log('LOL 3');

	const html = renderer(req, TodoRouter, store, context, jsfile);

	console.log('LOL 4');

	return { promises, html };
};

// export const getExtraContent = (req) => {
// 	const store = configExtraStore(req);
// 	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
// 	const jsfile = 'extra.js';

// 	return renderer(req, ExtraRouter, store, context, jsfile);
// };
