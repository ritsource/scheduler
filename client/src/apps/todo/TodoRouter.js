import Todo from './Todo';

import TodoPage from './pages/Todo';
import NotFoundPage from '../_common/pages/NotFound';

const TodoRouter = [
	{
		...Todo,
		path: '/',
		routes: [
			{ ...NotFoundPage, path: '/', exact: true },
			{ ...TodoPage, path: '/todo', exact: true },
			{ ...NotFoundPage }
		]
	}
];

export default TodoRouter;
