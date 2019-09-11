import '@babel/polyfill';
import 'cross-fetch/polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';

import checkAuth from './middlewares/check_auth';

const app = express();

app.use(cookieParser());
app.use(express.static('public'));

import extraRoute from './routes/extra_route';
import todoRoute from './routes/todo_route';
import calendarRoute from './routes/calendar_route';
import notFoundRoute from './routes/404_route';

if (process.env.IS_GETAWAY_SERVICE === 'true') {
	app.get('/api*', (req, res) => {
		res.redirect(`http://"${process.env.SERVER_URI}${req.path}`);
	});

	app.get('/auth*', (req, res) => {
		res.redirect(`http://"${process.env.SERVER_URI}${req.path}`);
	});

	app.get('/graphql*', (req, res) => {
		res.redirect(`http://"${process.env.SERVER_URI}${req.path}`);
	});
}

app.get('/', checkAuth, (req, res) => {
	if (req._isAuth) {
		res.redirect('/calendar');
	} else {
		res.redirect('/about');
	}
});

extraRoute(app);
todoRoute(app);
calendarRoute(app);
notFoundRoute(app); // Not Found Route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App-Renderer is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
