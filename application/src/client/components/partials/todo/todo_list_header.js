import React, { useState, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import GroupOptDropdownComp from '../../reusables/opt_dropdowns/group_opt';

export const TodoListHeader = (props) => {
	const [ title, setTitle ] = useState('');
	const [ dropdown_visible, setDropdownVis ] = useState(false);
	const [ screenX, setScreenX ] = useState(null);
	const [ screenY, setScreenY ] = useState(null);
	const [ windowHeightDiff, setWindowHeightDiff ] = useState(0);

	useEffect(() => {
		if (props.activeGroup && props.activeGroup.title !== title) {
			setTitle(props.activeGroup.title);
		}
	}, []);

	const { activeGroup } = props;

	return (
		<div className="list-002-header">
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (title !== '') {
						await props.asyncEditGroup(activeGroup._id, { title: title });
						if (document) document.querySelector('#list-002-header-input-inside-form').blur();
					}
				}}
			>
				<input
					id="list-002-header-input-inside-form"
					className="awesome-app-transparent-input-999"
					name="listname"
					autoComplete="off"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>

			{props.loading_anime && (
				<div
					style={{
						// border: '1px solid red',
						paddingRight: '32px',
						marginRight: '5px',
						marginTop: '-13px'
					}}
				>
					<div className="lds-ring">
						<div />
						<div />
						<div />
						<div />
					</div>
				</div>
			)}

			<GroupOptDropdownComp
				// { ...state }
				dropdown_visible={dropdown_visible}
				windowHeightDiff={windowHeightDiff}
				{...props}
				group={activeGroup}
				positionObj={{
					right: `calc(100vw - ${screenX}px - 8px)`,
					top: screenY - windowHeightDiff - 8
				}}
				showDropdown={(x, y, whd) => {
					setWindowHeightDiff(whd);
					setScreenX(x);
					setScreenY(y);
					setDropdownVis(true);
				}}
				hideDropdown={() => {
					setDropdownVis(false);
					setScreenX(null);
					setScreenY(null);
				}}
				onRenameClick={() => {
					if (document) document.querySelector('#list-002-header-input-inside-form').focus();
				}}
				hex_color={props.activeGroup.hex_color}
			>
				<button
					name="View Group Options"
					className="calendar-sidebar-item-options-btn"
					onClick={() => {
						setDropdownVis(true);
					}}
				>
					<FaEllipsisH
						style={{
							marginBottom: '-2px'
						}}
					/>
				</button>
			</GroupOptDropdownComp>
		</div>
	);
};

export default TodoListHeader;
