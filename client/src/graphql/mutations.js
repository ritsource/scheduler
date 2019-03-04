import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			_id
			email
			name
			avatar_url
			custom_colors
		}
	}
`;

export const REGISTER_USER = gql`
	mutation registerUser($email: String!, $name: String!, $password: String!) {
		registerUser(email: $email, name: $name, password: $password) {
			_id
			email
			name
			avatar_url
			custom_colors
		}
	}
`;

export const ADD_NEW_GROUP = gql`
	mutation createGroup($title: String!) {
		createGroup(title: $title) {
			_id
		}
	}
`;

export const EDIT_GROUP_BY_ID = gql`
	mutation editGroupById($groupId: ID!, $title: String, $hex_color: String) {
		editGroupById(groupId: $groupId, title: $title, hex_color: $hex_color) {
			_id
		}
	}
`;

export const DELETE_GROUP = gql`
	mutation deleteGroup($groupId: ID!) {
		deleteGroup(groupId: $groupId) {
			_id
		}
	}
`;

export const EDIT_GROUP_TO_VISIBLE = gql`
	mutation editGroupToVisible($groupId: ID!) {
		editGroupToVisible(groupId: $groupId) {
			_id
		}
	}
`;

export const EDIT_GROUP_TO_INVISIBLE = gql`
	mutation editGroupToInvisible($groupId: ID!) {
		editGroupToInvisible(groupId: $groupId) {
			_id
		}
	}
`;

export const ADD_NEW_EVENT = gql`
	mutation createEvent($title: String!, $groupId: ID!) {
		createEvent(title: $title, _group: $groupId) {
			_id
		}
	}
`;

export const EDIT_EVENT_TO_DONE = gql`
	mutation editEventToDone($eventId: ID!) {
		editEventToDone(eventId: $eventId) {
			_id
		}
	}
`;

export const EDIT_EVENT_TO_NOT_DONE = gql`
	mutation editEventToNotDone($eventId: ID!) {
		editEventToNotDone(eventId: $eventId) {
			_id
		}
	}
`;

export const EDIT_EVENT_BY_ID = gql`
	mutation editEventById(
		$eventId: ID!
		$title: String
		$description: String
		$_group: ID
		$notification: Boolean
		$hex_color: String
	) {
		editEventById(
			eventId: $eventId
			title: $title
			description: $description
			_group: $_group
			notification: $notification
			hex_color: $hex_color
		) {
			_id
		}
	}
`;

export const EDIT_EVENT_DATES = gql`
	mutation editEventDates($eventId: ID!, $date_from: Float, $date_to: Float) {
		editEventDates(eventId: $eventId, date_from: $date_from, date_to: $date_to) {
			_id
			date_to
		}
	}
`;

export const DELETE_EVENT = gql`
	mutation deleteEvent($eventId: ID!) {
		deleteEvent(eventId: $eventId) {
			_id
			_isDeleted
		}
	}
`;

export const ADD_NEW_STEP = gql`
	mutation createStep($title: String!, $_event: ID!) {
		createStep(title: $title, _event: $_event) {
			title
		}
	}
`;

export const EDIT_STEP_BY_ID = gql`
	mutation createStep($title: String!, $stepId: ID!) {
		editStepById(stepId: $stepId, title: $title) {
			title
		}
	}
`;

export const DELETE_STEP = gql`
	mutation deleteStep($stepId: ID!) {
		deleteStep(stepId: $stepId) {
			title
			_isDeleted
		}
	}
`;

export const EDIT_STEP_TO_DONE = gql`
	mutation editStepToDone($stepId: ID!) {
		editStepToDone(stepId: $stepId) {
			_isDone
		}
	}
`;

export const EDIT_STEP_TO_NOT_DONE = gql`
	mutation editStepToNotDone($stepId: ID!) {
		editStepToNotDone(stepId: $stepId) {
			_isDone
		}
	}
`;

//
