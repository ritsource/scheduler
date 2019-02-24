import Todo from './Todo';

import NotFoundPage from '../_common/pages/NotFound';

const TodoRouter = [
	{
		...Todo,
		routes: [
			// { ...HomePage, path: '/', exact: true },
			{ ...NotFoundPage }
		]
	}
];

export default TodoRouter;
