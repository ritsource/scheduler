import { matchRoutes } from 'react-router-config';
import { getDataFromTree } from 'react-apollo';

import TodoRouter from '../apps/todo/TodoRouter';

import renderer from '../renderer';
import getApolloClient from '../graphql/apollo-for-server';

import { checkAuth } from '../server';

export default (app) => {
	app.get('/todo', checkAuth, (req, res) => {
		console.log('req._isAuth', req._isAuth);

		if (req._isAuth) {
			const context = { req };
			const client = getApolloClient(req);
			const jsfile = 'todo.js';

			const promises = matchRoutes(TodoRouter, req.path).map(({ route }) => {
				return route.loadData ? route.loadData(client, context) : null;
				// return getDataFromTree(route.component);
			});

			Promise.all(promises)
				.then((x) => {
					const html = renderer(req, TodoRouter, client, context, jsfile);
					res.send(html);
				})
				.catch((error) => {
					console.log('LOL 6');
					console.log('error', error.message);

					res.send(error);
				});
		} else {
			res.redirect('/about');
		}
	});
};
