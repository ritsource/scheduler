import React, { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';

import NotifyQueueContext from '../../_common/contexts/NotifyQueueContext';

const NotifyModal = (props) => {
	return (
		<NotifyQueueContext.Consumer>
			{(context) => {
				console.log('contextcontextcontextcontextcontextcontextcontextcontext', context);

				return (
					<React.Fragment>
						<div>
							<div style={{ position: 'absolute', zIndex: 51, width: '100vw', bottom: '0px' }}>
								{context.notifyQueue.map((text, i) => (
									<div
										style={
											text === 'Failed!' ? (
												{ borderLeft: '5px solid var(--danger-red-color)' }
											) : (
												{}
											)
										}
										className="NotifyModal-c-00 Flex-Class-Row-Space-Between Theme-Btn-Shadow-99"
										key={i}
									>
										<p>{text}</p>
										<button
											className="Theme-Btn-Type3-Exit-99"
											onClick={() => context.removeFromQueue(text)}
										>
											<IoIosAdd />
										</button>
									</div>
								))}
							</div>
						</div>
					</React.Fragment>
				);
			}}
		</NotifyQueueContext.Consumer>
	);

	return <React.Fragment />;
};

export default NotifyModal;
