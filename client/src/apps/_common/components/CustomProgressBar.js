import React, { useState, useEffect } from 'react';
import __isNode__ from '../../../utils/isNode';

const CustomProgressBar = ({ force }) => {
	const [ visible, setVisible ] = useState(true);

	useEffect(() => {
		setVisible(__isNode__ || !__javascript__);
	});

	return <React.Fragment>{(visible || force) && <div className="CustomProgressBar-c-00" />}</React.Fragment>;
};

export default CustomProgressBar;
