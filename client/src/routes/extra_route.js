import renderer from '../renderer';
import getApolloClient from '../graphql/apollo-for-server';

import ExtraRouter from '../apps/extra/ExtraRouter';

export default (app) => {
	app.get([ '/about', '/login', '/signup', '/forget-password', '/reset-password', '/privacy-policy' ], (req, res) => {
		const context = { req };
		const client = getApolloClient(req);
		const jsfile = 'extra.js';

		const html = renderer(req, ExtraRouter, client, context, jsfile);
		res.send(html);
	});
};
