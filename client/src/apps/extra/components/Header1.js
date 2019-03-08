import React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import ProgressbarContext from '../../_common/contexts/ProgressbarContext';
import CustomProgressBar from '../../_common/components/CustomProgressBar';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Header1 = ({ pathName }) => {
	return (
		<ProgressbarContext.Consumer>
			{(context) => (
				<React.Fragment>
					<CustomProgressBar />
					{context.progressBar && <CustomProgressBar force={true} />}
					<div className="Header1-c-00">
						<div className="Header1-Left-Div-01">
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
									Scheduler
								</h2>
							</Link>
						</div>
						<div className="Header1-Links-Container-01">
							<Link to="/about">
								<p className={`${pathName === 'about' && 'Header1-Links-Active'}`}>ABOUT</p>
							</Link>
							<Link to="/login">
								<p
									className={`${(pathName === 'login' || pathName === 'signup') &&
										'Header1-Links-Active'}`}
								>
									LOGIN
								</p>
							</Link>
							<Link to="/contact">
								<p className={`${pathName === 'contact' && 'Header1-Links-Active'}`}>CONTACT</p>
							</Link>
						</div>
					</div>
				</React.Fragment>
			)}
		</ProgressbarContext.Consumer>
	);
};

export default Header1;
