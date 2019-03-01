import React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import SidebarContext from '../../_common/contexts/SidebarContext';
import ProgressbarContext from '../../_common/contexts/ProgressbarContext';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Header2 = ({ pathName }) => {
	const toggleSidebar = () => {
		if (!__isNode__) {
			const instState = JSON.parse(window.localStorage.getItem('sidebarVisible'));
			console.log(instState);

			if (instState === null) {
				window.localStorage.setItem('sidebarVisible', false);
				return false;
			} else {
				window.localStorage.setItem('sidebarVisible', !instState);
				return !instState;
			}
		}
	};

	return (
		<SidebarContext.Consumer>
			{(context) => (
				<div className="Header2-c-00">
					<div className="Header2-Left-Div-01">
						<div
							className="Header2-Hamburger-Div-02"
							onClick={() => {
								const val = toggleSidebar();
								context.setSidebar(val);
							}}
						>
							<div />
							<div />
							<div />
						</div>
						<Link to="/">
							<h2 className="Theme-gradient-text">
								<ReactSVG
									src="/calendar.svg"
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
					<div className="Header2-Links-Container-01" />
				</div>
			)}
		</SidebarContext.Consumer>
	);
};

export default Header2;
