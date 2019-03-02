import React from 'react';
import Dropdown from 'react-dropdown-modal';
import { FaArrowRight, FaSortDown } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';

const OptionsHeader = (props) => {
	const { auth, dropdown, setDropdown } = props;

	return (
		<Dropdown
			visible={dropdown}
			onButtonClick={() => setDropdown(true)}
			onClose={() => setDropdown(false)}
			// showArrow={true}
			// arrowPosition={{ right: '0px' }}
			position={{ right: '33px', top: '60px' }}
			modalBackground="var(--background-color)"
			modalShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
			modalBorder={false}
			modalContent={() => (
				<div>
					<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
						Signed in as <span style={{ fontWeight: 'bold' }}>{auth.name.split(' ')[0]}</span>
					</div>

					<a href="/settings">
						<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
							<MdSettings style={{ marginRight: '8px', marginBottom: '-2px' }} />
							Settings
						</div>
					</a>

					<div
						className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
						onClick={(e) => {
							// changeAppTheme(myAppTheme === 'darkOnly' ? 'lightOnly' : 'darkOnly');
						}}
						style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
					>
						<MdInvertColors style={{ marginRight: '8px', marginBottom: '-2px' }} />
						Dark theme
						<div style={{}} />
					</div>

					<a href="/about">
						<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
							<GoOrganization style={{ marginRight: '8px', marginBottom: '-2px' }} />About
						</div>
					</a>

					<a href="/auth/logout">
						<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
							<FaArrowRight style={{ marginRight: '8px', marginBottom: '-2px' }} />Logout
						</div>
					</a>
				</div>
			)}
		>
			<div className="Header-Avatar-Siv-02" onClick={() => setDropdown(true)}>
				<img src={auth.avatar_url} />
				<FaSortDown style={{ marginTop: '5px', marginLeft: '5px' }} />
			</div>
		</Dropdown>
	);
};

export default OptionsHeader;
