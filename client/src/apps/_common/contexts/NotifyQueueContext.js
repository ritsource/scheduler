import React, { useState } from 'react';

const NotifyQueueContext = React.createContext({
	notifyQueue: [],
	addToQueue: () => {},
	popFromQueue: () => {},
	removeFromQueue: (x) => {}
});

export const NotifyQueueProvider = (props) => {
	const [ notifyQueue, setNotifyQueue ] = useState([]);

	const addToQueue = (text) => {
		setNotifyQueue(notifyQueue.concat([ text ]));
	};

	const popFromQueue = () => {
		const x = [ ...notifyQueue ];
		x.pop();
		setNotifyQueue(x);
	};

	const removeFromQueue = (text) => {
		setNotifyQueue(notifyQueue.filter((x) => x !== text));
	};

	return (
		<NotifyQueueContext.Provider value={{ notifyQueue, addToQueue, popFromQueue, removeFromQueue }}>
			{props.children}
		</NotifyQueueContext.Provider>
	);
};

export default NotifyQueueContext;
