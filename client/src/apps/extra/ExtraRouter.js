import Extra from './Extra';

import AboutPage from './pages/About';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgetPassPage from './pages/ForgetPass';
import ResetPassPage from './pages/ResetPass';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

import NotFoundPage from '../_common/pages/NotFound';

import React from 'react';
import { Redirect } from 'react-router-dom';
const Home = () => (
	<div>
		<Redirect to="/about" />
	</div>
);

const ExtraRouter = [
	{
		...Extra,
		path: '/',
		routes: [
			{ component: Home, path: '/', exact: true },
			{ ...AboutPage, path: '/about', exact: true },
			{ ...LoginPage, path: '/login', exact: true },
			{ ...SignupPage, path: '/signup', exact: true },
			{ ...ForgetPassPage, path: '/forgot-password', exact: true },
			{ ...ResetPassPage, path: '/reset-password', exact: true },
			{ ...PrivacyPolicyPage, path: '/privacy-policy' },
			{ ...NotFoundPage }
		]
	}
];

export default ExtraRouter;
