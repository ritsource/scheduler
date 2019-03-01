import React, { useState, useEffect } from 'react';

const SidebarContext = React.createContext({ progressBar: false, setProgressBar: (x) => {} });

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

export const SidebarProvider = (props) => {
	const [ sidebar, setSidebar ] = useState(false);

	useEffect(() => {
		setSidebar(JSON.parse(window.localStorage.getItem('sidebarVisible')));

		return () => {};
	}, []);

	return <SidebarContext.Provider value={{ sidebar, setSidebar }}>{props.children}</SidebarContext.Provider>;
};

export default SidebarContext;
