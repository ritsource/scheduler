import React from 'react';
import { FaCheck } from 'react-icons/fa';

const EventDoneIndicator = (props) => {
	const { _isDone, hex_color, patchFunction, propagation } = props;

	return (
		<div
			className={`EventDoneIndicator-c-00 ${_isDone && 'EventDoneIndicator-c-00-isDone'}`}
			style={
				_isDone ? (
					{ color: 'white', background: hex_color, border: `1px solid ${hex_color}` }
				) : (
					{ color: 'rgba(0, 0, 0, 0)', background: 'rgba(0, 0, 0, 0)', border: `1px solid ${hex_color}` }
				)
			}
			onClick={(e) => {
				if (!propagation) e.stopPropagation();
				patchFunction();
			}}
		>
			<FaCheck style={{ fontSize: '10px' }} />
		</div>
	);
};

export default EventDoneIndicator;
