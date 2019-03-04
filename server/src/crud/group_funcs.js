const { group_color_list } = require('../constants/colors');

const mongoose = require('mongoose');
const Group = mongoose.model('Group');

const requireAuth = (req) => {
	if (!req.user) {
		throw new Error('Authentication Required');
	}
};

module.exports = {
	readAllGroups: async ({}, req) => {
		requireAuth(req);

		try {
			const allGroups = await Group.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			return allGroups;
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	},

	readGroupById: async ({ groupId }, req) => {
		requireAuth(req);

		try {
			const theGroup = await Group.findOne({
				_id: groupId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return theGroup;
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	},

	// readGroupsOnCalendar: async ({}, req) => {
	// 	requireAuth(req);

	// 	try {
	// 		const allGroups = await Group.find({
	// 			_creator: req.user._id,
	// 			_isOnCalendar: true,
	// 			_isDeleted: false
	// 		});

	// 		return allGroups;
	// 	} catch (error) {
	// 		throw new Error('Unable to query groups');
	// 	}
	// },

	createGroup: async ({ title }, req) => {
		requireAuth(req);

		try {
			const hex_color = group_color_list[Math.floor(Math.random() * 5)];

			const count = await Group.countDocuments({
				_creator: req.user._id
			});

			const newGroup = await new Group({
				title,
				hex_color,
				_isPermanent: false,
				_rank: count,
				_creator: req.user._id
			}).save();

			return newGroup;
		} catch (error) {
			throw new Error('Unable to create group');
		}
	},

	editGroupToVisible: async ({ groupId }, req) => {
		requireAuth(req);

		try {
			const newGroup = await Group.findOneAndUpdate(
				{ _id: groupId, _creator: req.user._id },
				{ _isOnCalendar: true },
				{ new: true }
			);

			return newGroup;
		} catch (error) {
			throw new Error('Unable to edit group');
		}
	},

	editGroupToInvisible: async ({ groupId }, req) => {
		requireAuth(req);

		try {
			const newGroup = await Group.findOneAndUpdate(
				{ _id: groupId, _creator: req.user._id },
				{ _isOnCalendar: false },
				{ new: true }
			);

			return newGroup;
		} catch (error) {
			throw new Error('Unable to edit group');
		}
	},

	editGroupById: async ({ groupId, title, hex_color }, req) => {
		requireAuth(req);

		let editables = {};
		if (title) editables.title = title;
		if (hex_color) editables.hex_color = hex_color;

		try {
			const newGroup = await Group.findOneAndUpdate(
				{ _id: groupId, _creator: req.user._id },
				{ ...editables },
				{ new: true }
			);

			return newGroup;
		} catch (error) {
			throw new Error('Unable to edit group');
		}
	},

	deleteGroup: async ({ groupId }, req) => {
		requireAuth(req);

		try {
			const delGroup = await Group.findOneAndUpdate(
				{
					_id: groupId,
					_creator: req.user._id,
					_isPermanent: false
				},
				{ _isDeleted: true },
				{ new: true }
			);

			return delGroup;
		} catch (error) {
			throw new Error('Unable to delete group');
		}
	},

	rearrangeGroups: async ({ focusedGroup, fromRank, toRank, movedGroups }, req) => {
		requireAuth(req);

		try {
			await Group.updateMany(
				{ _id: { $in: [ ...movedGroups ] }, _creator: req.user._id },
				{ $inc: { _rank: fromRank > toRank ? 1 : -1 } },
				{ new: true }
			);

			await Group.findOneAndUpdate(
				{ _id: focusedGroup, _creator: req.user._id },
				{ $inc: { _rank: toRank - fromRank } },
				{ new: true }
			);

			const allGroups = await Group.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			return allGroups;
		} catch (error) {
			throw new Error('Unable to rearrange groups');
		}
	}
};
