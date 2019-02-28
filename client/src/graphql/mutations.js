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
			title
		}
	}
`;
