import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import ResetPasswordPage from '../../../src/client/components/pages/reset_pass_page';
import configureStore from '../../../src/helpers/configure_store';

test('Snapshot for ResetPasswordPage Component', () => {
  const wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn(() => {}) })}>
      <ResetPasswordPage.component
        handleAppMode={jest.fn(() =>  {})}
      />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
