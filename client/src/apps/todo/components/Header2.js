import React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

const Header2 = ({ pathName }) => {
	return (
		<div className="Header2-c-00">
			<div className="Header2-Left-Div-01">
				<div className="Header2-Hamburger-Div-02" onClick={() => {}}>
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
	);
};

export default Header2;
