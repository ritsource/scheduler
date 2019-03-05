import React, { useState } from 'react';
import dateFormat from 'dateformat';
import Datepicker from 'awesome-react-datepicker';

const EventDatepicker = (props) => {
	const { event, handleEventDateEdit } = props;

	const [ dFromAsync, setDFromAsync ] = useState(false);
	const [ dToAsync, setDToAsync ] = useState(false);

	return (
		<div className="Flex-Class-Row-Start" style={{ width: '100%', padding: '10px 0px' }}>
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
	);
};

export default EventDatepicker;
