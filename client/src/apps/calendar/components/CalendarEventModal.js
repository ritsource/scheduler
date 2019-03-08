import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Dropdown from 'react-dropdown-modal';
import { FaCircle, FaStream, FaTrash } from 'react-icons/fa';

import EnsureDeletion from '../../_common/components/EnsureDeletion';
import SubOptionColor from '../../_common/components/SubOptionColor';
import EventGroupSelector from '../../_common/components/EventGroupSelector';
import EventDatepicker from '../../_common/components/EventDatepicker';

import NotifyQueueContext from '../../_common/contexts/NotifyQueueContext';

import { DELETE_EVENT, EDIT_EVENT_BY_ID, EDIT_EVENT_DATES } from '../../../graphql/mutations';

const CalendarEventModal = (props) => {
	const { event, setActiveEvent, animatedClosing, client, notify } = props;

	const [ title, setTitle ] = useState(event.title || '');
	const [ groups, setGroups ] = useState([]);
	const [ askforDelete, setAskforDelete ] = useState(false);
	const [ colorPanelState, setColorPanelState ] = useState({ visible: false, screenX: null, screenY: null });

	// Handle Event Delete
	const handleEventDelete = () => {
		notify.addToQueue('Deleting...');
		client
			.mutate({
				mutation: DELETE_EVENT,
				variables: { eventId: event._id },
				refetchQueries: [ 'readGroupsOnCalendar' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				notify.removeFromQueue('Deleting...');
			})
			.catch(() => {
				notify.removeFromQueue('Deleting...');
				notify.addToQueue('Failed!');
			});
	};

	// Handle Event Edit
	const handleEventEdit = async ({ title, description, _group }) => {
		notify.addToQueue('Saving...');
		client
			.mutate({
				mutation: EDIT_EVENT_BY_ID,
				variables: { eventId: event._id, title, description, _group },
				refetchQueries: [ 'readGroupsOnCalendar' ],
				awaitRefetchQueries: true
			})
			.then(() => {
				notify.removeFromQueue('Saving...');
			})
			.catch(() => {
				notify.removeFromQueue('Saving...');
				notify.addToQueue('Failed!');
			});
	};

	// Handle  Event Dates Edit
	const handleEventDateEdit = async ({ date_from, date_to }) => {
		await client.mutate({
			mutation: EDIT_EVENT_DATES,
			variables: { eventId: event._id, date_from, date_to },
			refetchQueries: [ 'readGroupsOnCalendar' ],
			awaitRefetchQueries: true
		});
	};

	const findCachedGroups = () => {
		try {
			const { readGroupsOnCalendar } = client.readQuery({
				query: gql`
					query readGroupsOnCalendar {
						readGroupsOnCalendar {
							_id
							title
							hex_color
							_rank
						}
					}
				`
			});

			setGroups(readGroupsOnCalendar);
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(
		() => {
			if (event.title !== title) setTitle(event.title);
			// setIsDone(event._isDone);
		},
		[ event.title ]
	);

	useEffect(() => {
		findCachedGroups();
	}, []);

	const groupNow = groups.find(({ _id }) => _id === event._group);

	return (
		<div className="CalendarEventModal-c-00" onClick={(e) => e.stopPropagation()}>
			<div className="CalendarEventModal-Tools-Div-01">
				<div>
					<FaStream
						style={{ marginLeft: '15px' }}
						onClick={() => animatedClosing(() => setActiveEvent(event))}
					/>
				</div>
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
					onDelete={() => animatedClosing(async () => await handleEventDelete())}
					onCancel={() => {}}
				>
					<div>
						<FaTrash
							style={{ marginLeft: '15px', marginTop: '3px' }}
							onClick={() => setAskforDelete(true)}
						/>
					</div>
				</EnsureDeletion>

				<Dropdown
					visible={colorPanelState.visible}
					onButtonClick={(e) => {
						e.stopPropagation();
						setColorPanelState({ screenX: e.screenX, screenY: e.screenY, visible: true });
					}}
					onClose={() => {
						setColorPanelState({ screenX: null, screenY: null, visible: false });
						animatedClosing(() => {});
					}}
					position={{
						left: `calc(${colorPanelState.screenX}px - 8px)`,
						bottom: `calc(100vh - ${colorPanelState.screenY + 8}px)`
					}}
					// preventDefaultClose={true}
					modalBackground="var(--background-color)"
					modalShadow="0px 3px 13px 0px rgba(0,0,0,0.20)"
					modalBorder={false}
					customZIndex={21}
					modalContent={() => (
						<SubOptionColor
							event={event}
							pathName="calendar"
							closeThatShit={() => {
								setColorPanelState({ screenX: null, screenY: null, visible: false });
								animatedClosing(() => {});
							}}
						/>
					)}
				>
					<div>
						<FaCircle
							onClick={(e) => {
								e.stopPropagation();
								setColorPanelState({ screenX: e.screenX, screenY: e.screenY, visible: true });
							}}
							style={{ marginLeft: '15px', marginTop: '3px', color: event.hex_color }}
						/>
					</div>
				</Dropdown>
			</div>

			<div className="CalendarEventModal-Title-Div-01">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						animatedClosing(() => handleEventEdit({ title }));
					}}
				>
					<input
						className="Theme-Input-Underline-OnFoucs-99"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</form>
			</div>

			<EventDatepicker
				event={event}
				handleEventDateEdit={(args) => animatedClosing(async () => await handleEventDateEdit(args))}
			/>

			<div className="CalendarEventModal-Group-Selector-Div-01">
				{groups.length > 0 && (
					<EventGroupSelector event={event} groups={groups} handleEventEdit={handleEventEdit} />
				)}
			</div>
		</div>
	);
};

export default (props) => (
	<ApolloConsumer>
		{(client) => (
			<NotifyQueueContext.Consumer>
				{(notify) => <CalendarEventModal {...props} client={client} notify={notify} />}
			</NotifyQueueContext.Consumer>
		)}
	</ApolloConsumer>
);
