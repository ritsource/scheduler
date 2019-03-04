import React, { useState } from 'react';
import Dropdown from 'react-dropdown-modal';
import { IoIosBrush } from 'react-icons/io';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaEllipsisV } from 'react-icons/fa';

import EnsureDeletion from './EnsureDeletion';
import SubOptionColor from './SubOptionColor';

const OptionsGroup = (props) => {
	const {
		pathName,
		visible,
		group,
		showDropdown,
		hideDropdown,
		positionObj,
		onRenameClick,
		handleGroupDelete
	} = props;

	const [ askforDelete, setAskforDelete ] = useState(false);
	const [ colorPanelState, setColorPanelState ] = useState({ visible: false, screenX: null, screenY: null });

	return (
		<Dropdown
			visible={visible}
			onButtonClick={(e) => {
				showDropdown(e.screenX, e.screenY, window ? window.outerHeight - window.innerHeight : 0);
			}}
			onClose={hideDropdown}
			position={positionObj}
			modalShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
			modalBorder={false}
			modalContent={() => {
				return (
					<div>
						<div
							className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
							onClick={onRenameClick}
						>
							<MdModeEdit style={{ marginRight: '8px', marginBottom: '-2px' }} />Rename
						</div>

						{!group._isPermanent && (
							<EnsureDeletion
								visible={askforDelete}
								message="Are you sure you want to delete the group?"
								onClose={() => {
									setAskforDelete(false);
									setTimeout(() => props.hideDropdown(), 300);
								}}
								onDelete={handleGroupDelete}
								onCancel={() => setAskforDelete(true)}
							>
								<div
									className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
									onClick={(e) => {
										e.stopPropagation();
										setAskforDelete(true);
									}}
								>
									<MdDelete style={{ marginRight: '8px', marginBottom: '-2px' }} />Delete Group
								</div>
							</EnsureDeletion>
						)}

						<Dropdown
							visible={colorPanelState.visible}
							onButtonClick={(e) => {
								e.stopPropagation();
								setColorPanelState({ screenX: e.screenX, screenY: e.screenY, visible: true });
							}}
							onClose={() => {
								setColorPanelState({ screenX: null, screenY: null, visible: false });
								hideDropdown();
							}}
							position={
								props.calendar_sidebar_item ? (
									{
										left: `calc(${colorPanelState.screenX}px - 8px)`,
										bottom: `calc(100vh - ${colorPanelState.screenY - props.winHeightDiffer + 8}px)`
									}
								) : (
									{
										left: colorPanelState.screenX - 185 + 8,
										bottom: `calc(100vh - ${colorPanelState.screenY - props.winHeightDiffer + 8}px)`
									}
								)
							}
							// preventDefaultClose={true}
							modalBackground="var(--background-color)"
							modalShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
							modalBorder={false}
							customZIndex={21}
							modalContent={() => (
								<SubOptionColor
									group={group}
									pathName={pathName}
									closeThatShit={() => {
										setColorPanelState({ screenX: null, screenY: null, visible: false });
										hideDropdown();
									}}
								/>
							)}
						>
							<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
								<IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }} />
								Color
							</div>
						</Dropdown>
					</div>
				);
			}}
		>
			{props.children}
		</Dropdown>
	);
};

export default OptionsGroup;
