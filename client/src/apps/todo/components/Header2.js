import React, { useState, useEffect } from 'react';

import SidebarContext from '../../_common/contexts/SidebarContext';
import ProgressbarContext from '../../_common/contexts/ProgressbarContext';
import { AuthContext } from '../Todo';

import HeaderLogo from '../../_common/components/HeaderLogo';
import HeaderAppBtns from '../../_common/components/HeaderAppBtns';
import CustomProgressBar from '../../_common/components/CustomProgressBar';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

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

								{/* <div className="Header2-Links-Container-01" /> */}
								<AuthContext.Consumer>
									{(authContext) => {
										return <HeaderAppBtns auth={authContext.auth} pathName="todo" />;
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
