import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import ForgotPasswordPage from '../../../src/client/components/pages/forgot_pass_page';
import configureStore from '../../../src/helpers/configure_store';

test('Snapshot for LoginPage Component', () => {
  const wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn(() => {}) })}>
      <ForgotPasswordPage.component
        handleAppMode={jest.fn(() =>  {})}
      />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
