import renderer from './renderer';

import ExtraRouter from './apps/extra/ExtraRouter';
import configExtraStore from './apps/extra/configStore';

export const getExtraContent = (req) => {
	const store = configExtraStore(req);
	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
	const jsfile = 'extra.js';

	return renderer(req, ExtraRouter, store, context, jsfile);
};

import TodoRouter from './apps/todo/TodoRouter';
import configTodoStore from './apps/todo/configStore';

export const getTodoContent = (req) => {
	const store = configTodoStore(req);
	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
	const jsfile = 'todo.js';

	return renderer(req, TodoRouter, store, context, jsfile);
};

// export const getExtraContent = (req) => {
// 	const store = configExtraStore(req);
// 	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
// 	const jsfile = 'extra.js';

// 	return renderer(req, ExtraRouter, store, context, jsfile);
// };
