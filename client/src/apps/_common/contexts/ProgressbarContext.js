import React, { useState } from 'react';

const ProgressbarContext = React.createContext({ progressBar: false, setProgressBar: (x) => {} });

export const ProgressbarProvider = (props) => {
	const [ progressBar, setProgressBar ] = useState(false);

	return (
		<ProgressbarContext.Provider value={{ progressBar, setProgressBar }}>
			{props.children}
		</ProgressbarContext.Provider>
	);
};

export default ProgressbarContext;
