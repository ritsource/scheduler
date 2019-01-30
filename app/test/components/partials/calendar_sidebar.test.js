import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// import events from '../../__data__/events';
import groups from '../../__data__/groups';

import CalendarSidebarComp from '../../../src/client/components/partials/calendar/calendar_sidebar';
import configureStore from '../../../src/helpers/configure_store';

let wrapper, asyncFetchGroups, asyncPostGroup, asyncEditGroup, asyncDeleteGroup;

beforeEach(() => {
  asyncFetchGroups = jest.fn();
  asyncPostGroup = jest.fn();
  asyncEditGroup = jest.fn();
  asyncDeleteGroup = jest.fn();

  wrapper = shallow(
    <Provider store={configureStore({ get: jest.fn() })}>
      <CalendarSidebarComp
        visible={true}
        groups={groups}
        auth={{}}
        asyncFetchGroups={asyncFetchGroups}
        asyncPostGroup={asyncPostGroup}
        asyncEditGroup={asyncEditGroup}
        asyncDeleteGroup={asyncDeleteGroup}
      />
    </Provider>
  );
});

test('Snapshot for CalendarSidebarComp Component', () => {
  expect(wrapper).toMatchSnapshot();
});
