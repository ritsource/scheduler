import testReducer from '../../src/client/reducers/test_reducer';

test('Project reducer test', () => {
  const action = {
    type: 'ASYNC_TEST_ACTION',
    projects: [ { a: 1, b: 2 }, { a: 3, b: 4 }, { a: 5, b: 6 } ]
  }
  const state = testReducer([], action);
  expect(state).toEqual(action.projects);
});