import React, { useState, useEffect } from 'react';

const SidebarContext = React.createContext({ progressBar: false, setProgressBar: (x) => {} });

export const SidebarProvider = (props) => {
	const [ sidebar, setSidebar ] = useState(false);

	useEffect(() => {
		setSidebar(JSON.parse(window.localStorage.getItem('sidebarVisible')));

		return () => {};
	}, []);

	return <SidebarContext.Provider value={{ sidebar, setSidebar }}>{props.children}</SidebarContext.Provider>;
};

export default SidebarContext;
