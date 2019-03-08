import { matchRoutes } from 'react-router-config';
// import { getDataFromTree } from 'react-apollo';

import checkAuth from '../middlewares/check_auth';
import renderer from '../renderer';
import getApolloClient from '../graphql/apollo-for-server';

import CalendarRouter from '../apps/calendar/CalendarRouter';

export default (app) => {
	app.get('/calendar', checkAuth, (req, res) => {
		console.log('req._isAuth **********************', req._isAuth);

		if (req._isAuth) {
			const context = { req };
			const client = getApolloClient(req);
			const jsfile = 'calendar';

			const promises = matchRoutes(CalendarRouter, req.path).map(({ route }) => {
				return route.loadData ? route.loadData(client, context) : null;
				// return getDataFromTree(route.component);
			});

			Promise.all(promises)
				.then((x) => {
					const html = renderer(req, CalendarRouter, client, context, jsfile);
					res.send(html);
				})
				.catch((error) => {
					console.log('error', error.message);

					res.send(error);
				});
		} else {
			res.redirect('/about');
		}
	});
};
