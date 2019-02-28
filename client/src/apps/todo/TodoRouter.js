import Todo from './Todo';

import TodoPage from './pages/TodoPage';
import NotFoundPage from '../_common/pages/NotFound';

import React from 'react';
import { Redirect } from 'react-router-dom';
const Home = () => (
	<div>
		<Redirect to="/todo" />
	</div>
);

const TodoRouter = [
	{
		...Todo,
		path: '/',
		routes: [
			{ component: Home, path: '/', exact: true },
			{ ...TodoPage, path: '/todo', exact: true },
			{ ...NotFoundPage }
		]
	}
];

export default TodoRouter;
