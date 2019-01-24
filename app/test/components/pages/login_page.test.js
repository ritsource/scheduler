import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import LoginPage from '../../../src/client/components/pages/login_page';
import configureStore from '../../../src/helpers/configure_store';

test('Snapshot for LoginPage Component', () => {
  const wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn(() => {}) })}>
      <LoginPage.component
        auth={{}}
        sideBar={true}
        handleAppMode={jest.fn(() =>  {})}
        setReduxCalendar={jest.fn(() =>  {})}
      />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
