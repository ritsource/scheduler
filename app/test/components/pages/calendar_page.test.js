import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import events from '../../__data__/events';
import groups from '../../__data__/groups';

import CalendarPage from '../../../src/client/components/pages/calendar_page';
import configureStore from '../../../src/helpers/configure_store';

test('Snapshot for CalendarPage Component', () => {
  const wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn(() => {}) })}>
      <CalendarPage.component
        auth={{}}
        sideBar={true}
        handleAppMode={jest.fn(() =>  {})}
        setReduxCalendar={jest.fn(() =>  {})}
        groups={groups}
        events={events}
      />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
