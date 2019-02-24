const { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Event {
		title: String!
		description: String!
		hex_color: String!
		date_from: Float!
		date_to: Float!
		notification: Boolean!
		_group: Group!
		_creator: User!
		_steps: [Step!]!
		_isDeleted: Boolean!
		_isDone: Boolean!
		_rank: Int!
	}

	type Group {
		title: String!
		hex_color: String!
		_creator: User!
		_isDeleted: Boolean!
		_rank: Int!
		_isPermanent: Boolean!
		_isOnCalendar: Boolean!
	}

	type Step {
		title: String!
		_event: Event!
		_creator: User!
		_rank: Int!
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
`);
