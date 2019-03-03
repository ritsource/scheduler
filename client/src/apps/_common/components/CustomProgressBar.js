import React, { useState, useEffect } from 'react';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const CustomProgressBar = ({ force }) => {
	const [ visible, setVisible ] = useState(true);

	useEffect(() => {
		setVisible(__isNode__ || !__javascript__);
	});

	return <React.Fragment>{(visible || force) && <div className="CustomProgressBar-c-00" />}</React.Fragment>;
};

export default CustomProgressBar;
