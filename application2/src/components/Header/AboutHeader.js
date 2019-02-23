import React from 'react';
import Link from 'next/link';
import ReactSVG from 'react-svg';

const AboutHeader = ({ pageName }) => {
	return (
		<div className="AboutHeader-c-00">
			<div className="AboutHeader-Left-Div-01">
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
			<div className="AboutHeader-Links-Container-01">
				<Link href="/about" replace>
					<p className={`${pageName === 'about' && 'AboutHeader-Links-Active'}`}>ABOUT</p>
				</Link>
				<Link href="/login" replace>
					<p className={`${pageName === 'login' && 'AboutHeader-Links-Active'}`}>LOGIN</p>
				</Link>
				<Link href="/contact" replace>
					<p className={`${pageName === 'contact' && 'AboutHeader-Links-Active'}`}>CONTACT</p>
				</Link>
			</div>
		</div>
	);
};

export default AboutHeader;
