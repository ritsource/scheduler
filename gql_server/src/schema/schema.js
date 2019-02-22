// const { buildSchema } = require('graphql');
const { gql } = require('apollo-server');

// module.exports = buildSchema()

const typeDefs = gql`
	type Event {
		title: String!
		description: String!
		hex_color: String!
		date_from: Float!
		date_to: Float!
		notification: Boolean!
		_group: Group!
		_creator: User!
		# _steps
		_isDeleted: Boolean!
		_isDone: Boolean!
		_rank: Number!
	}

	type Group {
		title: String!
		hex_color: String!
		_creator: User!
		_isDeleted: Boolean!
		_rank: Number!
		_isPermanent: Boolean!
		_isOnCalendar: Boolean!
	}

	type Step {
		title: String!
		_event: Event!
		_creator: User!
		_rank: Number!
		_isDone: Boolean!
		_isDeleted: Boolean!
	}

	type User {
		googleId: String
		facebookId: String
		password: String
		email: String!
		name: String!
		avatar_url: String!
		custom_colors: [String!]!
	}

	type RootQuery {
		eventsByGroup(groupId: ID!): [Event!]!
		eventsBytime(startStamp: Float!, endStamp: Float!): [Event!]!
		eventsAll(userId: ID!): [Event!]!
		groupsAll(userId: ID!): [Group!]!
		stepsByEvent(eventId: ID!): [Step!]
		stepsAll(userId: ID!): [Step!]
	}

	type RootMutation {
		dummyMutation(x: String!): Event!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`;
