const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = {
	readAllEvents: async ({}, req) => {
		try {
			const allEvents = await Event.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			return allEvents;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	},

	readEventById: async ({ eventId }, req) => {
		try {
			const allEvents = await Event.find({
				_id: eventId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return allEvents;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	},

	readEventsByTime: async ({ from, to }, req) => {
		try {
			const allEvents = await Event.find({
				_creator: req.user._id,
				date_to: { $gte: from },
				date_from: { $lte: to },
				_isDeleted: false
			});

			return allEvents;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	},

	readEventsByGroup: async ({ groupId }, req) => {
		try {
			const allEvents = await Event.find({
				_group: groupId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return allEvents;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	}
};
