import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { asyncTestAction } from '../../src/client/actions/test_actions';

const createMockStore = configureMockStore([thunk]);

test('Project action returns an Array', async () => {
  const store = createMockStore({ projects: [] });
  const data = await store.dispatch(asyncTestAction());
  expect(Array.isArray(data)).toBe(true);
});

test('Project action dispatches ASYNC_TEST_ACTION', async () => {
  const store = createMockStore({ projects: [] });
  await store.dispatch(asyncTestAction());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ASYNC_TEST_ACTION',
    projects: expect.any(Array)
  });
});