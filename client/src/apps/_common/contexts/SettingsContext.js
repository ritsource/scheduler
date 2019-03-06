import React, { useState, useEffect } from 'react';

const SettingsContext = React.createContext({ progressBar: false, setProgressBar: (x) => {} });

export const SettingsProvider = (props) => {
	const [ settings, setSettings ] = useState(true);

	return <SettingsContext.Provider value={{ settings, setSettings }}>{props.children}</SettingsContext.Provider>;
};

export default SettingsContext;
