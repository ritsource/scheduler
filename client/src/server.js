import '@babel/polyfill';
import 'cross-fetch/polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import proxy from 'http-proxy-middleware';

import checkAuth from './middlewares/check_auth';

const app = express();

// forwarding requests to api-server, useful when client is teh gateaway server
// console.log('process.env.SERVER_URI', process.env.SERVER_URI);
app.use([ '/api', '/auth', '/graphql' ], proxy({ target: process.env.SERVER_URI, changeOrigin: true }));

app.use(cookieParser());
app.use(express.static('public'));

import extraRoute from './routes/extra_route';
import todoRoute from './routes/todo_route';
import calendarRoute from './routes/calendar_route';
import notFoundRoute from './routes/404_route';

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
