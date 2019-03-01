import React from 'react';
import { FaCheck } from 'react-icons/fa';

const EventDoneIndicator = (props) => {
	const { _isDone, hex_color, patchFunction } = props;

	return (
		<div
			className={`EventDoneIndicator-c-00 ${_isDone && 'EventDoneIndicator-c-00-isDone'}`}
			style={
				_isDone ? (
					{ color: 'var(--background-color)', background: hex_color, border: `1px solid ${hex_color}` }
				) : (
					{ color: 'rgba(0, 0, 0, 0)', background: 'rgba(0, 0, 0, 0)', border: `1px solid ${hex_color}` }
				)
			}
			onClick={(e) => {
				e.stopPropagation();
				patchFunction();
			}}
		>
			<FaCheck style={{ fontSize: '10px' }} />
		</div>
	);
};

export default EventDoneIndicator;
