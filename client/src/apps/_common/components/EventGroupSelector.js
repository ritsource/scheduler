import React, { useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { FaCircle } from 'react-icons/fa';
import { Selector, Option } from 'react-dropdown-selector';

const EventGroupSelector = (props) => {
	const { groups, event, handleEventEdit } = props;

	const [ groupAsync, setGroupAsync ] = useState(false);

	const groupNow = groups.find(({ _id }) => _id === event._group);

	return (
		<Selector
			onSelect={async (id) => {
				if (groupNow._id !== id) {
					setGroupAsync(true);
					await handleEventEdit({ _group: id });
					setGroupAsync(false);
				}
			}}
			inputHeight={36}
			optionHeight={36}
			numOptions={groups.length}
			numOptionsVisible={4}
			selectorBoxShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
			renderBtn={() => (
				<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99 EventDetailsBtns-Selected-01">
					<FaCircle
						style={
							groupAsync ? (
								{
									marginRight: '8px',
									marginBottom: '-2px',
									transition: 'border 0.3s ease-out',
									animation: 'Async-Button-Text 0.6s infinite'
								}
							) : (
								{ color: groupNow.hex_color, marginRight: '8px', marginBottom: '-2px' }
							)
						}
					/>
					{groupNow.title}
				</div>
			)}
		>
			{groups.map((group, i) => (
				<Option key={i} id={group._id}>
					<div
						className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99"
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'row', lignItems: 'center' }}>
							<FaCircle style={{ color: group.hex_color, marginRight: '8px', marginBottom: '-2px' }} />
							{group.title}
						</div>
						{group._id === groupNow._id && <GoCheck />}
					</div>
				</Option>
			))}
		</Selector>
	);
};

export default EventGroupSelector;
