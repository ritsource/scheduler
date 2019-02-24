import '@babel/polyfill';
import express from 'express';
import axios from 'axios';
// import helmet from 'helmet';
import { matchRoutes } from 'react-router-config';

import renderer from './renderer';

const app = express();

// app.use(helmet());

app.use(express.static('public'));

const checkAuth = async (req, res, next) => {
	try {
		const response = await axios.get('http://api_server:5000/api/current_user', {
			...req.body,
			headers: { cookie: req.get('cookie') || '' }
		});
		req._isAuth = true;
		next();
	} catch (error) {
		req._isAuth = false;
		next();
		// res.redirect('/about');
	}
};

// Extra Routes
import ExtraRouter from './apps/extra/ExtraRouter';
import configExtraStore from './apps/extra/configStore';

const getExtraContent = (req) => {
	const store = configExtraStore(req);
	const context = { pathName: req.path.replace(/^\/([^\/]*).*$/, '$1') };
	const jsfile = 'extra.js';

	return renderer(req, ExtraRouter, store, context, jsfile);
};

app.get([ '/about', '/login', '/signup', '/forget-password', '/reset-password' ], (req, res) => {
	const html = getExtraContent(req);
	res.send(html);
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
