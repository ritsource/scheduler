const mongoose = require('mongoose');
const Event = mongoose.model('Event');

const requireAuth = (req) => {
	if (!req.user) {
		throw new Error('Authentication Required');
	}
};

module.exports = {
	readAllEvents: async ({}, req) => {
		requireAuth(req);

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
		requireAuth(req);

		try {
			const theEvent = await Event.findOne({
				_id: eventId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return theEvent;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	},

	readEventsByTime: async ({ from, to }, req) => {
		requireAuth(req);

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
		requireAuth(req);

		try {
			const allEvents = await Event.find({
				_group: groupId,
				_creator: req.user._id,
				_isDeleted: false
			});

			// console.log(allEvents);

			return allEvents;
		} catch (error) {
			throw new Error('Unable to query events');
		}
	},

	createEvent: async ({ title, description, date_from, date_to, _group, hex_color }, req) => {
		requireAuth(req);

		try {
			const count = await Event.countDocuments({
				_creator: req.user._id
			});

			if (!date_from && date_to) date_from = date_to;
			else if (date_from && !date_to) date_to = date_from;
			else if (!date_from && !date_to) {
				date_from = new Date().setHours(0, 0, 0, 0).valueOf();
				date_to = new Date().setHours(0, 0, 0, 0).valueOf();
			}

			const bodyObj = {};
			if (title) bodyObj.title = title;
			if (description) bodyObj.description = description;
			if (hex_color) bodyObj.hex_color = hex_color;

			if (!_group) throw new Error('Group required');

			const newEvent = await new Event({
				...bodyObj,
				date_from,
				date_to,
				_group,
				_rank: count,
				_creator: req.user._id
			}).save();

			return newEvent;
		} catch (error) {
			throw new Error('Unable to add new event');
		}
	},

	editEventToDone: async ({ eventId }, req) => {
		requireAuth(req);

		try {
			const newEvent = await Event.findOneAndUpdate(
				{ _id: eventId, _creator: req.user._id },
				{ _isDone: true },
				{ new: true }
			);

			return newEvent;
		} catch (error) {
			throw new Error('Unable to edit event');
		}
	},

	editEventToNotDone: async ({ eventId }, req) => {
		requireAuth(req);

		try {
			const newEvent = await Event.findOneAndUpdate(
				{ _id: eventId, _creator: req.user._id },
				{ _isDone: false },
				{ new: true }
			);

			return newEvent;
		} catch (error) {
			throw new Error('Unable to edit event');
		}
	},

	editEventById: async ({ eventId, title, description, _group, notification, hex_color }, req) => {
		requireAuth(req);

		let editable = {};

		if (title) editable.title = title;
		if (description) editable.description = description;
		if (_group) editable._group = _group;
		if (notification) editable.notification = notification;
		if (hex_color) editable.hex_color = hex_color;

		try {
			const newEvent = await Event.findOneAndUpdate(
				{ _id: eventId, _creator: req.user._id },
				{ ...editable },
				{ new: true }
			);

			return newEvent;
		} catch (error) {
			throw new Error('Unable to edit event');
		}
	},

	editEventDates: async (body, req) => {
		requireAuth(req);

		const { eventId } = body;

		let date_from, date_to;
		const oldEvent = await Event.findOne({ _id: eventId, _creator: req.user._id });

		if (body.date_from && body.date_from !== oldEvent.date_from) {
			date_from = body.date_from;
			date_to = oldEvent.date_to + (body.date_from - oldEvent.date_from);
		}
		if (body.date_to) {
			if (body.date_to < oldEvent.date_from) date_to = oldEvent.date_from;
			else date_to = body.date_to;
		}

		if (!date_from) date_from = oldEvent.date_from;
		if (!date_to) date_to = oldEvent.date_to;

		try {
			const newEvent = await Event.findOneAndUpdate(
				{ _id: eventId, _creator: req.user._id },
				{ date_from, date_to },
				{ new: true }
			);

			return newEvent;
		} catch (error) {
			throw new Error('Unable to edit event');
		}
	},

	deleteEvent: async ({ eventId }, req) => {
		requireAuth(req);

		try {
			const delEvent = await Event.findOneAndUpdate(
				{ _id: eventId, _creator: req.user._id },
				{ _isDeleted: true },
				{ new: true }
			);

			return delEvent;
		} catch (error) {
			throw new Error('Unable to delete event');
		}
	},

	rearrangeEvents: async ({ focusedEvent, fromRank, toRank, movedEvents }, req) => {
		requireAuth(req);

		try {
			// find
			await Event.updateMany(
				{ _id: { $in: [ ...movedEvents ] }, _creator: req.user._id },
				{ $inc: { _rank: fromRank > toRank ? 1 : -1 } },
				{ new: true }
			);

			await Event.findOneAndUpdate(
				{ _id: focusedEvent, _creator: req.user._id },
				{ $inc: { _rank: toRank - fromRank } },
				{ new: true }
			);

			const allEvents = await Event.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			return allEvents;
		} catch (error) {
			throw new Error('Unable to rearrange event');
		}
	}
};
