import React, { useEffect } from 'react';
import Dropdown from 'react-dropdown-modal';
import { FaArrowRight, FaSortDown } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';

import changeColorMode from '../../../utils/changeColorMode';
import { setCookie, getCookie } from '../../../utils/cookie_funcs';

import EventDoneIndicator from './EventDoneIndicator';

import SettingsContext from '../contexts/SettingsContext';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const OptionsHeader = (props) => {
	const { auth, dropdown, setDropdown } = props;

	const getMyAppColorMode = () => (!__isNode__ ? getCookie('myAppColorMode') : null);

	useEffect(
		() => {
			changeColorMode(getMyAppColorMode() || 'lightOnly');
		},
		[ __isNode__ ]
	);

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

					<SettingsContext.Consumer>
						{({ settings, setSettings }) => {
							return (
								<div
									onClick={() => setSettings(true)}
									className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
								>
									<MdSettings style={{ marginRight: '8px', marginBottom: '-2px' }} />
									Settings
								</div>
							);
						}}
					</SettingsContext.Consumer>

					<div
						className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
						onClick={(e) => {
							changeColorMode(getMyAppColorMode() === 'darkOnly' ? 'lightOnly' : 'darkOnly');
						}}
						style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
					>
						<MdInvertColors style={{ marginRight: '8px', marginBottom: '-2px' }} />
						<div className="Flex-Class-Row-Space-Between" style={{ width: '100%' }}>
							Dark Mode
							<EventDoneIndicator
								_isDone={getMyAppColorMode() === 'darkOnly'}
								hex_color="var(--theme-color)"
								patchFunction={() => {}}
								propagation={true}
							/>
						</div>
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
