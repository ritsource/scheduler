import React, { useState } from 'react';

const NotifyQueueContext = React.createContext({
	notifyQueue: [],
	addToQueue: () => {},
	popFromQueue: () => {},
	removeFromQueue: (x) => {}
});

export const NotifyQueueProvider = (props) => {
	const [ notifyQueue, setNotifyQueue ] = useState([ 'Fetching..', 'Saving..' ]);

	const addToQueue = (text) => {
		setNotifyQueue(notifyQueue.unshift(text));
		// setNotifyQueue(notifyQueue.push(text));
	};

	const popFromQueue = () => setNotifyQueue(notifyQueue.pop());

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
