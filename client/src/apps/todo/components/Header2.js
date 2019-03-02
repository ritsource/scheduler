import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import SidebarContext from '../../_common/contexts/SidebarContext';
import ProgressbarContext from '../../_common/contexts/ProgressbarContext';
import { AuthContext } from '../Todo';
import OptionsHeader from '../../_common/components/OptionsHeader';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Header2 = ({ pathName }) => {
	const [ dropdown, setDropdown ] = useState(false);

	const toggleSidebar = () => {
		if (!__isNode__) {
			const instState = JSON.parse(window.localStorage.getItem('sidebarVisible'));
			// console.log(instState);

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
		<ProgressbarContext.Consumer>
			{(progressbarContext) => (
				<React.Fragment>
					{progressbarContext.progressBar && <CustomProgressBar />}

					<SidebarContext.Consumer>
						{(sidebarContext) => (
							<div className="Header2-c-00">
								<div className="Header2-Left-Div-01">
									<div
										className="Header2-Hamburger-Div-02"
										onClick={() => sidebarContext.setSidebar(toggleSidebar())}
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
								{/* <div className="Header2-Links-Container-01" /> */}
								<AuthContext.Consumer>
									{(authContext) => {
										return (
											<div className="Header2-Right-Div-01">
												<div className="Header2-Right-Div-App-Mode-02">
													<a href="/calendar">
														<button className="Theme-Btn-Type2-Grey-99">Calendar</button>
													</a>
													{/* <Link href="/todo"> */}
													<button
														style={{ marginLeft: '10px' }}
														className="Theme-Btn-Type2-Normal-99"
													>
														Todo
													</button>
													{/* </Link> */}
												</div>
												{authContext.auth && (
													<OptionsHeader
														auth={authContext.auth}
														dropdown={dropdown}
														setDropdown={setDropdown}
														// setProgressBar={progressbarContext.setProgressBar}
													/>
												)}
											</div>
										);
									}}
								</AuthContext.Consumer>
							</div>
						)}
					</SidebarContext.Consumer>
				</React.Fragment>
			)}
		</ProgressbarContext.Consumer>
	);
};

export default Header2;
