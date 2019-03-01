const mongoose = require('mongoose');
const Step = mongoose.model('Step');

const requireAuth = (req) => {
	if (!req.user) {
		throw new Error('Authentication Required');
	}
};

module.exports = {
	readAllSteps: async ({}, req) => {
		requireAuth(req);

		try {
			const allSteps = await Step.find({
				_creator: req.user._id,
				_isDeleted: false
			});

			return allSteps;
		} catch (error) {
			throw new Error('Unable to read steps');
		}
	},

	readStepsByEvent: async ({ eventId }, req) => {
		requireAuth(req);

		try {
			const allSteps = await Step.find({
				_event: eventId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return allSteps;
		} catch (error) {
			throw new Error('Unable to read steps');
		}
	},

	createStep: async ({ title, _event }, req) => {
		requireAuth(req);

		try {
			const count = await Step.countDocuments({
				_creator: req.user._id
			});

			const newStep = await new Step({
				title,
				_event,
				_rank: count,
				_creator: req.user._id
			}).save();

			return newStep;
		} catch (error) {
			throw new Error('Unable to create step');
		}
	},

	editStepById: async ({ stepId, title }, req) => {
		requireAuth(req);

		try {
			const newStep = await Step.findOneAndUpdate(
				{ _id: stepId, _creator: req.user._id, _isDeleted: false },
				{ title },
				{ new: true }
			);

			return newStep;
		} catch (error) {
			throw new Error('Unable to edit step');
		}
	},

	editStepToDone: async ({ stepId }, req) => {
		requireAuth(req);

		try {
			const newStep = await Step.findOneAndUpdate(
				{ _id: stepId, _creator: req.user._id, _isDeleted: false },
				{ _isDone: true },
				{ new: true }
			);

			return newStep;
		} catch (error) {
			throw new Error('Unable to edit step');
		}
	},

	editStepToNotDone: async ({ stepId }, req) => {
		requireAuth(req);

		try {
			const newStep = await Step.findOneAndUpdate(
				{ _id: stepId, _creator: req.user._id, _isDeleted: false },
				{ _isDone: false },
				{ new: true }
			);

			return newStep;
		} catch (error) {
			throw new Error('Unable to edit step');
		}
	},

	deleteStep: async ({ stepId }, req) => {
		requireAuth(req);

		try {
			const delStep = await Step.findOneAndUpdate(
				{ _id: stepId, _creator: req.user._id },
				{ _isDeleted: true },
				{ new: true }
			);

			return delStep;
		} catch (error) {
			throw new Error('Unable to delete step');
		}
	},

	rearrangeSteps: async ({ focusedStep, fromRank, toRank, movedSteps }, req) => {
		requireAuth(req);

		try {
			await Step.updateMany(
				{ _id: { $in: [ ...movedSteps ] }, _creator: req.user._id },
				{ $inc: { _rank: fromRank > toRank ? 1 : -1 } },
				{ new: true }
			);

			await Step.findOneAndUpdate(
				{ _id: focusedStep, _creator: req.user._id },
				{ $inc: { _rank: toRank - fromRank } },
				{ new: true }
			);

			const allSteps = await Step.find({
				// _event: eventId,
				_creator: req.user._id,
				_isDeleted: false
			});

			return allSteps;
		} catch (error) {
			throw new Error('Unable to rearrange steps');
		}
	}
};
