import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { HomePage } from '../../src/client/components/home_page';
import projects from '../__data/projects';

it('Snapshot testing HomePage', () => {
  const myMockFn = jest.fn(() => {});
  const tree = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <HomePage projects={projects} asyncTestAction={myMockFn} />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});