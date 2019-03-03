import Calendar from './Calendar';

import CalendarPage from './pages/CalendarPage';
import NotFoundPage from '../_common/pages/NotFound';

import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = () => (
	<div>
		<Redirect to="/calendar" />
	</div>
);

const CalendarRouter = [
	{
		...Calendar,
		path: '/',
		routes: [
			{ component: Home, path: '/', exact: true },
			{ ...CalendarPage, path: '/calendar', exact: true },
			{ ...NotFoundPage }
		]
	}
];

export default CalendarRouter;
