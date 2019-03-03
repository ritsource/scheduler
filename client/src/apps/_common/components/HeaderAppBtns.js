import React, { useState } from 'react';

import OptionsHeader from './OptionsHeader';

const HeaderAppBtns = (props) => {
	const { auth, pathName } = props;
	const [ dropdown, setDropdown ] = useState(false);

	return (
		<div className="Header2-Right-Div-01">
			<div className="Header2-Right-Div-App-Mode-02">
				<a href="/calendar">
					<button disabled={pathName === 'calendar'} className="Theme-Btn-Type2-Grey-99">
						Calendar
					</button>
				</a>
				<a href="/todo">
					<button
						disabled={pathName === 'todo'}
						style={{ marginLeft: '10px' }}
						className="Theme-Btn-Type2-Normal-99"
					>
						Todo
					</button>
				</a>
			</div>
			{auth && <OptionsHeader auth={auth} dropdown={dropdown} setDropdown={setDropdown} />}
		</div>
	);
};

export default HeaderAppBtns;
