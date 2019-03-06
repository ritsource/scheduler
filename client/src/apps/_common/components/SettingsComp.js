import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCircle } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoPerson, GoVersions, GoRocket, GoCheck } from 'react-icons/go';
import { Selector, Option } from 'react-dropdown-selector';
import { IoIosAdd } from 'react-icons/io';

import AuthContext from '../contexts/AuthContext';

import EventDoneIndicator from './EventDoneIndicator';

import changeColorMode from '../../../utils/changeColorMode';
import { setCookie, getCookie } from '../../../utils/cookie_funcs';

import { app_theme_options } from '../../../utils/constants';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const SettingsComp = (props) => {
	const { setSettings } = props;

	const getMyAppColorMode = () => (!__isNode__ ? getCookie('myAppColorMode') : null);
	const [ appMode, setAddMode ] = useState(getMyAppColorMode());

	useEffect(
		() => {
			changeColorMode(getMyAppColorMode() || 'lightOnly');
			setAddMode(getMyAppColorMode()); // darkOnly
		},
		[ __isNode__ ]
	);

	return (
		<AuthContext.Consumer>
			{({ auth }) => (
				<div style={{ overflow: 'auto' }} className="EventDetails-c-00 SettingsComp-c-00">
					<div className="Flex-Class-Row-Space-Between">
						<div className="SettingsComp-Auth-Info-02 Flex-Class-Row-Start">
							<img src={auth.avatar_url} />
							<div>
								<h3>{auth.name}</h3>
								<p>{auth.email}</p>
							</div>
						</div>

						<button
							className="SettingsComp-Exit-Btn-02 Flex-Class-Row-Center"
							onClick={() => setSettings(false)}
						>
							<IoIosAdd />
						</button>
					</div>

					<a target="_blank" href="/privacy-policy">
						<div className="SettingsComp-Setting-Div-01 SettingsComp-Setting-Div-Flexible-01 Theme-Slide-Background-onHover-99">
							<div className="Flex-Class-Row-Start">
								<GoPerson />
								<p>Privacy Policy</p>
							</div>
							<FaArrowRight />
						</div>
					</a>

					<a target="_blank" href="https://github.com/ritwik310/scheduler/releases">
						<div className="SettingsComp-Setting-Div-01 SettingsComp-Setting-Div-Flexible-01 Theme-Slide-Background-onHover-99">
							<div className="Flex-Class-Row-Start">
								<GoVersions />
								<p>Version - 2.0.0</p>
							</div>
							<FaArrowRight />
						</div>
					</a>

					<a target="_blank" href="https://github.com/ritwik310/scheduler">
						<div className="SettingsComp-Setting-Div-01 SettingsComp-Setting-Div-Flexible-01 Theme-Slide-Background-onHover-99">
							<div className="Flex-Class-Row-Start">
								<GoRocket />
								<p>Contribute</p>
							</div>
							<FaArrowRight />
						</div>
					</a>

					<label>Theme Mode</label>

					<div className="SettingsComp-Setting-Div-01">
						<div className="Flex-Class-Row-Start">
							<MdInvertColors />
							<p>Dark Mode</p>
						</div>
						<EventDoneIndicator
							_isDone={appMode === 'darkOnly'}
							hex_color="var(--theme-color)"
							patchFunction={() => {
								changeColorMode(getMyAppColorMode() === 'darkOnly' ? 'lightOnly' : 'darkOnly');
								setAddMode(getMyAppColorMode());
							}}
						/>
					</div>

					<label style={{ marginBottom: '10px' }}>App Theme</label>

					<Selector
						onSelect={(id) => {}}
						inputHeight={36}
						optionHeight={36}
						numOptions={app_theme_options.length}
						numOptionsVisible={4}
						selectorBoxShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
						renderBtn={() => (
							<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99 EventDetailsBtns-Selected-01">
								<FaCircle
									style={{
										color: app_theme_options[0].hex_color,
										marginRight: '8px',
										marginBottom: '-2px'
									}}
								/>
								{app_theme_options[0].title}
							</div>
						)}
					>
						{app_theme_options.map((themeOpt, i) => (
							<Option key={i} id={themeOpt.title}>
								<div className="Flex-Class-Row-Space-Between Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
									<div className="Flex-Class-Row-Center">
										<FaCircle
											style={{
												color: themeOpt.hex_color,
												marginRight: '8px',
												marginBottom: '-2px'
											}}
										/>
										{themeOpt.title}
									</div>
									{themeOpt._id === app_theme_options[0]._id && <GoCheck />}
								</div>
							</Option>
						))}
					</Selector>
				</div>
			)}
		</AuthContext.Consumer>
	);
};

export default SettingsComp;
