import '@babel/polyfill';
import 'cross-fetch/polyfill';
import express from 'express';
import axios from 'axios';
// import helmet from 'helmet';
import proxy from 'http-proxy-middleware';

const app = express();

// app.use('/graphql', proxy({ target: 'http://api_server:5000/graphql', changeOrigin: true }));

// app.use(helmet());

app.use(express.static('public'));

const checkAuth = async (req, res, next) => {
	try {
		const response = await axios.get('http://api_server:5000/api/current_user', {
			...req.body,
			headers: { cookie: req.get('cookie') || '' }
		});

		if (response.data) {
			req._isAuth = true;
			next();
		} else {
			throw new Error('Not Authenticated');
		}
	} catch (error) {
		req._isAuth = false;
		next();
	}
};

import { getExtraContent, getTodoContent } from './render_handler';

app.get([ '/about', '/login', '/signup', '/forget-password', '/reset-password' ], (req, res) => {
	const html = getExtraContent(req);
	res.send(html);
});

app.get('/todo', checkAuth, (req, res) => {
	if (req._isAuth) {
		const { promises, html } = getTodoContent(req);

		Promise.all(promises)
			.then((x) => {
				console.log('LOL 5');
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

app.get('*', checkAuth, (req, res) => {
	if (req._isAuth && false) {
		// Render Calendar
		res.status(404).send({ message: '404, Page Not Found' });
	} else {
		const html = getExtraContent(req);
		res.status(404).send(html);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App-Renderer is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
