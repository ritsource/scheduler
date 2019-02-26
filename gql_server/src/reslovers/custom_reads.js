const { readGroupsOnCalendar, readEventsByGroup } = require('../crud/event_funcs');
const { readAllGroups } = require('../crud/group_funcs');

module.exports = {
	satReadAllGroups: async (args, req) => {
		const groups = await readAllGroups(args, req);

		const satGroups = groups.map((group) => ({
			...group._doc,
			_events: readEventsByGroup.bind(this, { groupId: group._doc._id }, req)
		}));

		return satGroups;
	}, // Read all Groups

	satReadGroupsOnCalendar: async (args, req) => {
		const groups = await readGroupsOnCalendar(args, req);

		const satGroups = groups.map((group) => ({
			...group._doc,
			_events: readEventsByGroup.bind(this, { groupId: group._doc._id }, req)
		}));

		return satGroups;
	} // Read all Groups active on Calendar
};
