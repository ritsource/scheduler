const { readEventsByGroup } = require('../crud/event_funcs');
const { editGroupToVisible } = require('../crud/group_funcs');

module.exports = {
	satEditGroupToVisible: async (args, req) => {
		const group = await editGroupToVisible(args, req);
		group._events = readEventsByGroup.bind(this, { groupId: group._doc._id }, req);

		return group;
		// return await editGroupToVisible(args, req);
	} // to _onCalendar true
};
