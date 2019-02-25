const { readAllEvents, readEventById, readEventsByGroup, readEventsByTime } = require('../crud/event_funcs');
const { readAllGroups, readGroupById } = require('../crud/group_funcs');
const { readAllSteps, readStepsByEvent } = require('../crud/step_funcs');

module.exports = {
	// readAllEvents: async (args, req) => {
	// 	return await readAllEvents(args, req);
	// }, // Reading all Events
	// readEventById: async (args, req) => {
	// 	return await readEventById(args, req);
	// }, // Reading single event by id
	// readEventsByTime: async (args, req) => {
	// 	return await readEventsByTime(args, req);
	// }, // Reading Events By Time Range
	// readEventsByGroup: async (args, req) => {
	// 	return await readEventsByGroup(args, req);
	// }, // Reading Events By Group
	// readAllGroups: async (args, req) => {
	// 	return await readAllGroups(args, req);
	// }, // Read all Groups
	// readGroupById: async (args, req) => {
	// 	return await readGroupById(args, req);
	// }, // Read Single Group
	// readAllSteps: async (args, req) => {
	// 	return await readAllSteps(args, req);
	// }, // Read all Steps
	// readStepsByEvent: async (args, req) => {
	// 	return await readStepsByEvent(args, req);
	// } // Read Single Step
};
