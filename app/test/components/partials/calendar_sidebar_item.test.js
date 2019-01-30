import React from 'react';
import { shallow } from 'enzyme';

import { builtin_color_list } from '../../../src/client/utils/constants'
import groups from '../../__data__/groups';

import CalendarSidebarItem from '../../../src/client/components/partials/calendar/calendar_sidebar_item';

let wrapper, changeColorFunc, asyncEditGroup, asyncDeleteGroup;

beforeEach(() => {
  changeColorFunc = jest.fn();
  asyncEditGroup = jest.fn();
  asyncDeleteGroup = jest.fn();

  wrapper = shallow(
    <CalendarSidebarItem
      index={0}
      group={groups[0]}
      asyncEditGroup={asyncEditGroup}
      asyncDeleteGroup={asyncDeleteGroup}
      color_options={[ ...builtin_color_list ]}
      changeColorFunc={changeColorFunc}
    />
  );
});

test('Snapshot for CalendarSidebarItem Component', () => {
  expect(wrapper).toMatchSnapshot();
});
