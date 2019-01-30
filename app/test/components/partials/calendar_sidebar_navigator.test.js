import React from 'react';
import { shallow } from 'enzyme';

import CalendarSidebarNavigator from '../../../src/client/components/partials/calendar/calendar_sidebar_navigator';

let wrapper, handleNavigation, navigateToNow;

beforeEach(() => {
  handleNavigation = jest.fn();
  navigateToNow = jest.fn();

  wrapper = shallow(
    <CalendarSidebarNavigator
      miniCalendarState={{ year: 2019, month: 0 }}
      handleNavigation={handleNavigation}
      navigateToNow={navigateToNow}
    />
  );
});

test('Snapshot for CalendarSidebarNavigator Component', () => {
  expect(wrapper).toMatchSnapshot();
});
