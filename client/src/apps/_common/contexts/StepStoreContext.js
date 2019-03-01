import React, { useState } from 'react';

const StepStoreContext = React.createContext({ steps: {}, setSteps: (arr) => {} });

export const StepStoreProvider = (props) => {
	const [ steps, setSteps ] = useState({});

	return <StepStoreContext.Provider value={{ steps, setSteps }}>{props.children}</StepStoreContext.Provider>;
};

export default StepStoreContext;
