import { matchRoutes } from 'react-router-config';
import renderer from './renderer';
import getApolloClient from './graphql/apollo-for-server';
import { getDataFromTree } from 'react-apollo';

import ExtraRouter from './apps/extra/ExtraRouter';
import TodoRouter from './apps/todo/TodoRouter';

export const getExtraContent = (req) => {
	const context = { req };
	const client = getApolloClient(req);
	const jsfile = 'extra.js';

	return renderer(req, ExtraRouter, client, context, jsfile);
};

// export const getTodoContent = (req) => {

// };

// export const getExtraContent = (req) => {
// 	const store = configExtraStore(req);
// 	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
// 	const jsfile = 'extra.js';

// 	return renderer(req, ExtraRouter, store, context, jsfile);
// };
