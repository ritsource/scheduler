const mongoose = require('mongoose');
const Group = mongoose.model('Group');

module.exports = {
	readAllSteps: async ({}, req) => {
		try {
			const allSteps = await Step.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			res.send(allSteps);
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	},

	readStepsByEvent: async ({ eventId }, req) => {
		try {
			const allSteps = await Step.find({
				_event: eventId,
				_creator: req.user._id,
				_isDeleted: false
			});

			res.send(allSteps);
		} catch (error) {
			throw new Error('Unable to query groups');
		}
	}
};
