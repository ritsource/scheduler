import gql from 'graphql-tag';

export const FETCH_ALL_GROUPS = gql`
	query readAllGroups {
		readAllGroups {
			_id
			title
			hex_color
			_rank
			# _isOnCalendar
			_isPermanent
			_events {
				_id
				title
				# description
				hex_color
				date_from
				date_to
				# notification
				# _isDeleted
				_isDone
				_rank
			}
		}
	}
`;

export const FETCH_STEPS_BY_EVENT = gql`
	query readStepsByEvent($eventId: String!) {
		readStepsByEvent(eventId: $eventId) {
			# _id
			title
			_rank
			_isDone
		}
	}
`;

export const FETCH_CURRENT_USER = gql`
	query currentUser {
		currentUser {
			_id
			googleId
			facebookId
			email
			name
			avatar_url
			custom_colors
		}
	}
`;
