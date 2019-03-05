import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown-modal';

import CalendarEventModal from './CalendarEventModal';

const CalendarEvent = (props) => {
	const { event, visible, setActiveEvent } = props;

	const [ dropdown, setDropdown ] = useState(false);
	const [ screenX, setScreenX ] = useState(false);
	const [ screenY, setScreenY ] = useState(false);
	const [ windowHeight, setWindowHeight ] = useState(false);
	const [ dropdown_close, setDropdown_close ] = useState(false);

	const { startIndex, endIndex } = event;
	const widthExtra = endIndex - startIndex;

	const returnModalPosition = () => {
		const mHeight = 178;
		const mWidth = 340;

		const toBeDown = windowHeight && screenY + 200 < windowHeight;
		const toBeRight = screenX < 350;

		return {
			left: toBeRight ? screenX - 8 : screenX - mWidth + 8,
			top: toBeDown ? screenY - 8 : screenY - mHeight + 8
		};
	};

	return (
		<Dropdown
			visible={dropdown}
			onButtonClick={(e) => {
				e.stopPropagation();
				const winHeightDiffer = window ? window.outerHeight - window.innerHeight : 0;

				setDropdown(true);
				setScreenX(e.screenX);
				setScreenY(e.screenY - winHeightDiffer);
				setWindowHeight(window ? document.documentElement.offsetHeight : null);
				setDropdown_close();
			}}
			onClose={() => {
				setDropdown(false);
				setScreenX(null);
				setScreenY(null);
			}}
			animation={true}
			animeType={screenX < 350 ? 'slideRight' : 'slideLeft'}
			animeDuration={200}
			animatedClose={dropdown_close}
			showArrow={false}
			position={returnModalPosition()}
			modalShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
			modalBorder={false}
			modalContent={() => (
				<CalendarEventModal
					addEvent={false}
					event={event}
					animatedClosing={(someFunc) => {
						setDropdown_close(true);
						someFunc();
						setTimeout(() => {
							setDropdown(false);
							setDropdown_close(false);
						}, 200);
					}}
					setActiveEvent={setActiveEvent}
				/>
			)}
		>
			{visible ? (
				<div
					draggable
					className="Calendar-c-00"
					style={{
						overflowX: 'visible',
						width: `calc(${(widthExtra + 1) * 100}% - 10px - 4px)`,
						background: event.hex_color
					}}
					onClick={() => setDropdown(true)}
				>
					<div className="Calendar-Div-Over-Title-01">
						<p>{event.title}</p>
					</div>
				</div>
			) : (
				<div className="Calendar-Empty-Event-01" />
			)}
		</Dropdown>
	);
};

export default CalendarEvent;
