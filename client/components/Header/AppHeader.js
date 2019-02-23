import React from 'react';
import Link from 'next/link';
import ReactSVG from 'react-svg';

import CalendarNavigator from './CalendarNavigator';

const AppHeader = ({ pageName }) => {
	return (
		<div className="AppHeader-c-00">
			<div className="AppHeader-Left-Div-01">
				<div className="AppHeader-hamburger-div-01" onClick={() => {}}>
					<div />
					<div />
					<div />
				</div>
				<Link href="/">
					<h2 className="Theme-gradient-text">
						<ReactSVG
							src="/static/calendar.svg"
							svgStyle={{
								height: '25px',
								marginTop: '3px',
								marginRight: '10px',
								width: 'auto'
							}}
						/>
						Schedular
					</h2>
				</Link>
			</div>

			<CalendarNavigator />
		</div>
	);
};

export default AppHeader;
