import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import events from '../../__data__/events';
import groups from '../../__data__/groups';

import CalendarPage from '../../../src/client/components/pages/calendar_page';
import configureStore from '../../../src/helpers/configure_store';

let wrapper, handleAppMode, setReduxCalendar;

beforeEach(() => {
  handleAppMode = jest.fn();
  setReduxCalendar = jest.fn();

  wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn() })}>
      <CalendarPage.component
        auth={{}}
        sideBar={true}
        handleAppMode={handleAppMode}
        setReduxCalendar={setReduxCalendar}
        groups={groups}
        events={events}
      />
    </Provider>
  );
});

test('Snapshot for CalendarPage Component', () => {
  expect(wrapper).toMatchSnapshot();
});



