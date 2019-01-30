import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import events from '../../__data__/events';
import groups from '../../__data__/groups';

import CalendarContentComp from '../../../src/client/components/partials/calendar/calendar_content';
import configureStore from '../../../src/helpers/configure_store';

let jsx, wrapper, wrapper2, toggleEventDetails;

beforeEach(() => {
  toggleEventDetails = jest.fn();
  
  wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn() })}>
      <CalendarContentComp
        miniCalendar={false}
        year={2019}
        month={0}
        staticContext={undefined}
        toggleEventDetails={toggleEventDetails}
      />
    </Provider>
  );
});

test('Snapshot for CalendarContentComp Component', () => {
  wrapper = 
  expect(wrapper).toMatchSnapshot();
});
