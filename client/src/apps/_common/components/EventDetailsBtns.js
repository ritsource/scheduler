import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

import EnsureDeletion from './EnsureDeletion';
import EventGroupSelector from './EventGroupSelector';
import EventDatepicker from './EventDatepicker';

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
	const [ askforDelete, setAskforDelete ] = useState(false);

	return (
		<div className="EventDetailsBtns-c-00">
			{groups.length > 0 && (
				<EventGroupSelector event={event} groups={groups} handleEventEdit={handleEventEdit} />
			)}

			<EventDatepicker event={event} handleEventDateEdit={handleEventDateEdit} />

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
						onDelete={async () => handleEventDelete()}
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
