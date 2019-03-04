import React, { useState, useEffect } from 'react';

import SidebarContext from '../contexts/SidebarContext';
import ProgressbarContext from '../contexts/ProgressbarContext';
import AuthContext from '../contexts/AuthContext';

import HeaderLogo from './HeaderLogo';
import HeaderAppBtns from './HeaderAppBtns';
import CustomProgressBar from './CustomProgressBar';

const Header2 = ({ pathName }) => {
	return (
		<ProgressbarContext.Consumer>
			{(progressbarContext) => (
				<React.Fragment>
					{progressbarContext.progressBar && <CustomProgressBar />}
					{/* <CustomProgressBar /> */}

					<SidebarContext.Consumer>
						{(sidebarContext) => (
							<div className="Header2-c-00">
								<HeaderLogo
									progressBar={progressbarContext.progressBar}
									setProgressBar={progressbarContext.setProgressBar}
									setSidebar={sidebarContext.setSidebar}
								/>

								<AuthContext.Consumer>
									{(authContext) => {
										return <HeaderAppBtns auth={authContext.auth} pathName={pathName} />;
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
