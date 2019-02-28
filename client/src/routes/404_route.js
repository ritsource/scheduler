import renderer from '../renderer';
import getApolloClient from '../graphql/apollo-for-server';
import checkAuth from '../middlewares/check_auth';

import ExtraRouter from '../apps/extra/ExtraRouter';

export default (app) => {
	app.get('*', checkAuth, (req, res) => {
		if (req._isAuth && false) {
			// Render Calendar
			res.status(404).send({ message: '404, Page Not Found' });
		} else {
			const context = { req };
			const client = getApolloClient(req);
			const jsfile = 'extra.js';

			const html = renderer(req, ExtraRouter, client, context, jsfile);
			res.status(404).send(html);
		}
	});
};
