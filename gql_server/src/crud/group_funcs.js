const mongoose = require('mongoose');
const Group = mongoose.model('Group');

module.exports = {
	readAllGroups: async ({}, req) => {
		try {
			const allGroups = await Group.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			res.send(allGroups);
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	},

	readGroupById: async ({ groupId }, req) => {
		try {
			const allGroups = await Group.find({
				_id: groupId,
				_creator: req.user._id,
				_isDeleted: false
			});

			res.send(allGroups);
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	}
};
