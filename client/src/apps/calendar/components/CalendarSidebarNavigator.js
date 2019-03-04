import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { month_name_dictionary, day_name_dictionary } from '../../../utils/constants';

const CalendarSidebarNavigator = (props) => {
	const { month, year, handleNavigation } = props;

	return (
		<div className="CalendarSidebarNavigator-c-00 Flex-Class-Row-Space-Between">
			<p>{month_name_dictionary[month]}</p>
			<div className="Flex-Class-Row-Center">
				<button onClick={() => handleNavigation(false)}>
					<FaAngleLeft style={{ margin: 'auto 2px 0px auto' }} />
				</button>
				<button onClick={() => handleNavigation(true)}>
					<FaAngleRight style={{ margin: 'auto auto 0px 2px' }} />
				</button>
			</div>
		</div>
	);
};

export default CalendarSidebarNavigator;
