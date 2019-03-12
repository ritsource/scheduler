import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCircle } from 'react-icons/fa';
import { MdSettings, MdInvertColors } from 'react-icons/md';
import { GoPerson, GoVersions, GoRocket, GoCheck } from 'react-icons/go';
import { Selector, Option } from 'react-dropdown-selector';
import { IoIosAdd } from 'react-icons/io';

import AuthContext from '../contexts/AuthContext';

import EventDoneIndicator from './EventDoneIndicator';

import changeColorMode from '../../../utils/changeColorMode';
import changeColorTheme from '../../../utils/changeColorTheme';
import { setCookie, getCookie } from '../../../utils/cookie_funcs';

import { app_theme_options } from '../../../utils/constants';

import __isNode__ from '../../../utils/isNode';

const SettingsComp = (props) => {
	const { setSettings } = props;

	const getMyAppColorMode = () => (!__isNode__ ? getCookie('myAppColorMode') : null);
	const getMyAppColorTheme = () => (!__isNode__ ? getCookie('myAppColorTheme') : null);
	const [ appMode, setAddMode ] = useState(getMyAppColorMode());

	useEffect(
		() => {
			changeColorMode(getMyAppColorMode() || 'lightOnly');
			changeColorTheme(getMyAppColorTheme());
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

						<button className="Theme-Btn-Type3-Exit-99" onClick={() => setSettings(false)}>
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
								<p>Version - 2.0.0-beta.1</p>
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
						onSelect={(id) => {
							changeColorTheme(id);
						}}
						inputHeight={36}
						optionHeight={36}
						numOptions={3}
						numOptionsVisible={4}
						selectorBoxShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
						renderBtn={() => (
							<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99 EventDetailsBtns-Selected-01">
								<FaCircle
									style={{
										color: app_theme_options[getMyAppColorTheme()],
										marginRight: '8px',
										marginBottom: '-2px'
									}}
								/>
								{getMyAppColorTheme()}
							</div>
						)}
					>
						{Object.keys(app_theme_options).map((key, i) => {
							return (
								<Option key={i} id={key}>
									<div className="Flex-Class-Row-Space-Between Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
										<div className="Flex-Class-Row-Center">
											<FaCircle
												style={{
													color: app_theme_options[key],
													marginRight: '8px',
													marginBottom: '-2px'
												}}
											/>
											{key}
										</div>
										{key === getMyAppColorTheme() && <GoCheck />}
									</div>
								</Option>
							);
						})}
					</Selector>
				</div>
			)}
		</AuthContext.Consumer>
	);
};

export default SettingsComp;
