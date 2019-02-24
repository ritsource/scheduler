import '@babel/polyfill';
import express from 'express';
import axios from 'axios';
// import helmet from 'helmet';
import { matchRoutes } from 'react-router-config';

import renderer from './renderer';
const app = express();

// app.use(helmet());

app.use(express.static('public'));

const requireAuth = async (req, res, next) => {
	try {
		const response = await axios.get('http://api_server:5000/api/current_user', {
			...req.body,
			headers: { cookie: req.get('cookie') || '' }
		});
		next();
	} catch (error) {
		res.redirect('/about');
	}
};

// Extra Routes
import ExtraRouter from './apps/extra/ExtraRouter';
import configExtraStore from './apps/extra/configStore';

app.get([ '/about', '/login', '/signup', '/forget-password', '/reset-password' ], (req, res) => {
	const store = configExtraStore(req);
	// const router = ExtraRouter;

	const html = renderer(req, ExtraRouter, store, {});

	res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App-Renderer is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
