import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { month_name_dictionary } from '../../../utils/constants';
import { funcHandleYear, funcHandleMonth } from '../../../utils/funcs';

const HeaderNavigator = (props) => {
	const { year, month, handleUrlNavigation } = props;

	const navigate = (bool) => {
		const tempYear = funcHandleYear(year, month, bool);
		const tempMonth = funcHandleMonth(month, bool);
		handleUrlNavigation({ year: tempYear, month: tempMonth });
	};

	const navigateToNow = () => {
		const tempYear = new Date().getFullYear();
		const tempMonth = new Date().getMonth();
		handleUrlNavigation({ year: tempYear, month: tempMonth });
	};

	return (
		<div className="HeaderNavigator-c-00">
			<button className="Theme-Btn-Type2-Grey-99" onClick={navigateToNow}>
				Today
			</button>

			<button
				className="HeaderNavigator-Nav-Btn-01 Theme-Btn-Type2-Grey-99 Flex-Class-Row-Center"
				onClick={() => navigate(false)}
				style={{ marginRight: '0px' }}
			>
				<FaAngleLeft />
			</button>

			<button
				className="HeaderNavigator-Nav-Btn-01 Theme-Btn-Type2-Grey-99 Flex-Class-Row-Center"
				onClick={() => navigate(true)}
				style={{ marginLeft: '0px' }}
			>
				<FaAngleRight />
			</button>

			<p>
				{month_name_dictionary[month]}&nbsp;&nbsp;{year}
				{/* September 0000 */}
			</p>
		</div>
	);
};

export default HeaderNavigator;
