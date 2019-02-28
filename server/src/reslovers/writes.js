const {
	createEvent,
	editEventById,
	editEventDates,
	editEventToDone,
	editEventToNotDone,
	deleteEvent,
	rearrangeEvents
} = require('../crud/event_funcs');
const {
	createGroup,
	editGroupById,
	editGroupToVisible,
	editGroupToInvisible,
	deleteGroup,
	rearrangeGroups
} = require('../crud/group_funcs');
const { createStep, editStepToDone, editStepToNotDone, deleteStep, rearrangeSteps } = require('../crud/step_funcs');

module.exports = {
	// EVENT RESOLVERS
	createEvent: async (args, req) => {
		return await createEvent(args, req);
	}, // Create new Event

	editEventById: async (args, req) => {
		return await editEventById(args, req);
	}, // Edit a Event

	editEventDates: async (args, req) => {
		return await editEventDates(args, req);
	}, // Edit event Dates

	editEventToDone: async (args, req) => {
		return await editEventToDone(args, req);
	}, // Edit Event to Done

	editEventToNotDone: async (args, req) => {
		return await editEventToNotDone(args, req);
	}, // Edit Event to Not Done (Undone)

	deleteEvent: async (args, req) => {
		return await deleteEvent(args, req);
	}, // Delete a Event

	rearrangeEvents: async (args, req) => {
		return await rearrangeEvents(args, req);
	}, // Rearrange _ranks of an Event

	// GROUP RESOLVERS
	createGroup: async (args, req) => {
		return await createGroup(args, req);
	}, // Create a new Group

	editGroupById: async (args, req) => {
		return await editGroupById(args, req);
	}, // Edit a SIngle Group

	editGroupToVisible: async (args, req) => {
		const group = await editGroupToVisible(args, req);
		group._events = readEventsByGroup.bind(this, { groupId: group._doc._id }, req);

		return group;
	}, // to _onCalendar true

	editGroupToInvisible: async (args, req) => {
		return await editGroupToInvisible(args, req);
	}, // to _onCalendar false

	deleteGroup: async (args, req) => {
		return await deleteGroup(args, req);
	}, // Delete a Group

	rearrangeGroups: async (args, req) => {
		return await rearrangeGroups(args, req);
	}, // Rearrage group _ranks'

	// SSTEP RESOLVERS
	createStep: async (args, req) => {
		return await createStep(args, req);
	}, // Craete a new STep

	editStepToDone: async (args, req) => {
		return await editStepToDone(args, req);
	}, // Edit step to done

	editStepToNotDone: async (args, req) => {
		return await editStepToNotDone(args, req);
	}, // Edit step to not done

	deleteStep: async (args, req) => {
		return await deleteStep(args, req);
	}, // Delete Steps

	rearrangeSteps: async (args, req) => {
		return await rearrangeSteps(args, req);
	} // Rearrange Steps
};
