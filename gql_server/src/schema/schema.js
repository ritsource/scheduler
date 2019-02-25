const { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Event {
		_id: ID!
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
		_id: ID!
		title: String!
		hex_color: String!
		_creator: User!
		_isDeleted: Boolean!
		_rank: Int!
		_isPermanent: Boolean!
		_isOnCalendar: Boolean!
		_events: [Event!]!
	}

	type Step {
		_id: ID!
		title: String!
	#		_event: Event!
		_creator: User!
		_rank: Int!
		_isDone: Boolean!
		_isDeleted: Boolean!
	}

	type User {
		_id: ID!
		googleId: String
		facebookId: String
		password: String
		email: String!
		name: String!
		avatar_url: String!
		custom_colors: [String!]!
	}

	type RootQuery {
		currentUser: User

		readAllEvents : [Event!]!
		readEventById(eventId: ID!) : Event!
		readEventsByTime(from: Float, to: Float) : [Event!]!
		readEventsByGroup(groupId: ID!) : [Event!]!
	
		readAllGroups : [Group!]!
		readGroupById(groupId: ID!) : Group!

		readAllSteps : [Step!]!
		readStepsByEvent(eventId: ID!) : [Step!]!
	}

	type RootMutation {
		registerUser(name: String! email: String! password: String!): User!
		loginUser(email: String! password: String!): User!
		logout: User

		createEvent(title: String! description: String date_from: Float, date_from: Float) : Event!
		editEventToDone(eventId: ID!) : Event!
		editEventToNotDone(eventId: ID!) : Event!
		editEventById(eventId: ID! title: String description: String _group: ID notification: Boolean hex_color: String) : Event!
		editEventDates(eventId: ID! date_from: Float, date_from: Float) : Event!
		deleteEvent(eventId: ID!) : Event!
		rearrangeEvents(focusedEvent: ID!, fromRank: Int!, toRank: Int!, movedEvents: [ID!]!) : [Event!]!

		createGroup(title: String! hex_color: String) : Group!
		editGroupToVisible(groupID: ID!) : Group!
		editGroupToInvisible(groupId: ID!) : Group!
		editGroupById(groupId: ID! title: String hex_color: String) : Group!
		deleteGroup(groupId: ID!) : Group!
		rearrangeGroups(focusedGroup: ID! fromRank: Int! toRank: Int! movedGroups: [ID!]!) : [Group!]!

		createStep(title: String! _event: ID!) : Step!
		editStepToDone(stepId: ID!) : Step!
		editStepToNotDone(stepId: ID!) : Step!
		deleteStep(stepId: ID!) : Step!
		rearrangeSteps(focusedStep: ID! fromRank: Int! toRank: Int! movedSteps: [ID!]!) : [Step!]!
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
