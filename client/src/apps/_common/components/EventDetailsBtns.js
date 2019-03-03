import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTrash, FaCircle } from 'react-icons/fa';
import { GoCheck } from 'react-icons/go';
import dateFormat from 'dateformat';
import Datepicker from 'awesome-react-datepicker';
import { Selector, Option } from 'react-dropdown-selector';

import EnsureDeletion from './EnsureDeletion';

const EventDetailsBtns = (props) => {
	const {
		event,
		groups,
		hex_color,
		handleEventEdit,
		handleEventDateEdit,
		handleEventDelete,
		closeEventDetails
	} = props;

	const [ description, setDescription ] = useState(event.description);
	const [ dFromAsync, setDFromAsync ] = useState(false);
	const [ dToAsync, setDToAsync ] = useState(false);
	const [ groupAsync, setGroupAsync ] = useState(false);
	const [ askforDelete, setAskforDelete ] = useState(false);

	const groupNow = groups.find(({ _id }) => _id === event._group);

	return (
		<div className="EventDetailsBtns-c-00">
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
								<FaCircle
									style={{ color: group.hex_color, marginRight: '8px', marginBottom: '-2px' }}
								/>
								{group.title}
							</div>
							{group._id === groupNow._id && <GoCheck />}
						</div>
					</Option>
				))}
			</Selector>

			<div className="EventDetailsBtns-Datepicker-Container-01">
				<Datepicker
					initDate={new Date(event.date_from)}
					themeColor="var(--theme-color-middle)"
					borderColor="1px solid var(--border-color)"
					borderRadius="2px"
					onDateSelect={async (timeStamp) => {
						setDFromAsync(true);
						await handleEventDateEdit({ date_from: timeStamp });
						setDFromAsync(false);
					}}
				>
					<button
						className="Theme-Btn-Type2-Grey-99"
						style={
							dFromAsync ? (
								{
									transition: 'border 0.3s ease-out',
									animation: 'Async-Button-Text 0.6s infinite',
									flexGrow: 1
								}
							) : (
								{ flexGrow: 1 }
							)
						}
					>
						{/* {new Date(event.date_from).getFormattedDate()} */}
						{dateFormat(event.date_from, 'mmmm dS')}
					</button>
				</Datepicker>

				<p style={{ margin: '5px' }}>to</p>

				<Datepicker
					themeColor="var(--theme-color-middle)"
					initDate={new Date(event.date_to)}
					onDateSelect={async (timeStamp) => {
						setDToAsync(true);
						await handleEventDateEdit({ date_to: timeStamp });
						setDToAsync(false);
					}}
				>
					<button
						className="Theme-Btn-Type2-Grey-99"
						style={
							dToAsync ? (
								{
									transition: 'border 0.3s ease-out',
									animation: 'Async-Button-Text 0.6s infinite',
									flexGrow: 1
								}
							) : (
								{ flexGrow: 1 }
							)
						}
					>
						{/* {new Date(event.date_to).getFormattedDate()} */}
						{dateFormat(event.date_to, 'mmmm dS')}
					</button>
				</Datepicker>
			</div>

			<div className="EventDetailsBtns-More-Btns-Container-01">
				<button className="Theme-Btn-Type2-Grey-99" onClick={closeEventDetails}>
					<FaArrowLeft style={{ marginBottom: '-2px' }} />
				</button>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<EnsureDeletion
						visible={askforDelete}
						message="Are you sure you want to delete the event?"
						onClose={() => {
							setAskforDelete(false);
						}}
						onDelete={async () => {
							// closeEventDetails();
							await handleEventDelete();
						}}
						onCancel={() => {}}
					>
						<button
							style={{ marginLeft: '10px' }}
							className="Theme-Btn-Type2-Grey-99"
							onClick={() => setAskforDelete(true)}
						>
							<FaTrash style={{ marginBottom: '-2px' }} />
						</button>
					</EnsureDeletion>
				</div>
			</div>

			<p style={{ margin: '10px 0px', fontWeight: 'bold', color: hex_color }}>Description</p>

			<textarea
				className="EventDetailsBtns-Textarea-01"
				placeholder="Add description.."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<button
				style={{ border: `1px solid ${hex_color}` }}
				className="EventDetailsBtns-Desc-Submit-Btn-01"
				style={{ background: hex_color, color: 'white' }}
				onClick={async () => {
					console.log(description);

					await handleEventEdit({ description: description });
					document.querySelector('.EventDetailsBtns-Textarea-01').blur();
				}}
			>
				Save
			</button>
		</div>
	);
};

export default EventDetailsBtns;
