import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import EventDoneIndicator from '../../_common/components/EventDoneIndicator';
import OptionsGroup from '../../_common/components/OptionsGroup';

const CalendarSidebarItem = (props) => {
	const { group, handleGroupRename, handleGroupDelete, handleGroupVisiblity } = props;

	const [ title, setTitle ] = useState(group.title);
	const [ isOnCalendar, setIsOnCalendar ] = useState(group._isOnCalendar);
	const [ inputDis, setInputDis ] = useState(true);
	const [ dropdown, setDropdown ] = useState(false);
	const [ screenX, setScreenX ] = useState(null);
	const [ screenY, setScreenY ] = useState(null);
	const [ winHeightDiffer, setWinHeightDiffer ] = useState(0);

	useEffect(
		() => {
			setIsOnCalendar(group._isOnCalendar);
		},
		[ group._isOnCalendar ]
	);

	const showDropdown = (x, y, whd) => {
		setWinHeightDiffer(whd);
		setScreenX(x);
		setScreenY(y);
		setDropdown(true);
	};

	const hideDropdown = () => {
		setDropdown(false);
		setScreenX(null);
		setScreenY(null);
	};

	return (
		<div className="CalendarSidebarItem-c-00">
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<EventDoneIndicator
					_isDone={isOnCalendar}
					hex_color={group.hex_color}
					patchFunction={() => {
						handleGroupVisiblity(group._id, !isOnCalendar);
						setIsOnCalendar(!isOnCalendar);
					}}
				/>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleGroupRename({ groupId: group._id, title, hex_color: group.hex_color });
					}}
				>
					<input
						id={`CalendarSidebarItem-Input-xx-${group._id}`}
						className="Theme-Input-Underline-OnFoucs-99"
						disabled={inputDis}
						name="title"
						autoComplete="off"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={() => {
							setTitle(group.title);
							setInputDis(true);
						}}
					/>
				</form>
			</div>

			<OptionsGroup
				pathName="calendar"
				visible={dropdown}
				group={group}
				winHeightDiffer={winHeightDiffer}
				positionObj={{
					left: `calc(${screenX}px - 8px)`,
					bottom: `calc(100vh - ${screenY - winHeightDiffer + 8}px)`
				}}
				handleGroupDelete={() => handleGroupDelete(group._id)}
				showDropdown={showDropdown}
				hideDropdown={hideDropdown}
				onRenameClick={async () => {
					await setInputDis(false);
					document.querySelector(`#CalendarSidebarItem-Input-xx-${group._id}`).focus();
				}}
				// hex_color={group.hex_color}
			>
				<button
					className="CalendarSidebarItem-Options-Btn-02 Flex-Class-Row-Center"
					onClick={() => setDropdown(true)}
				>
					<FaEllipsisV />
				</button>
			</OptionsGroup>
		</div>
	);
};

export default CalendarSidebarItem;
