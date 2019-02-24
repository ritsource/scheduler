import Todo from './Todo';

import TodoPage from './Todo';
import NotFoundPage from '../_common/pages/NotFound';

const TodoRouter = [
	{
		...Todo,
		routes: [ { ...TodoPage, path: '/todo', exact: true }, { ...NotFoundPage } ]
	}
];

export default TodoRouter;
