const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Step = mongoose.model('Step');

module.exports = (app) => {
  app.post('/api/step/new', requireAuth, async (req, res) => {
    try {
      const count = await Step.count({
        _creator: req.user._id,
      });

      const newStep = await new Step({
        ...req.body,
        _rank: count,
        _creator: req.user._id
      }).save();
      res.send(newStep);
    } catch (error) {
      // console.log(error.message);
      res.status(422).send();
    }
  });

  app.get('/api/step/all', requireAuth, async (req, res) => {
    try {
      const allStep = await Step.find({ _creator: req.user._id });
      res.send(allStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/step/by/:eventId', requireAuth, async (req, res) => {
    try {
      const allStep = await Step.find({
        _event: req.params.eventId,
        _creator: req.user._id
      });
      res.send(allStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/step/done/:stepId', requireAuth, async (req, res) => {
    try {
      const newStep = await Step.findOneAndUpdate(
        { _id: req.params.stepId, _creator: req.user._id },
        { _isDone: true },
        { new: true }
      );
      res.send(newStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/step/undo/:stepId', requireAuth, async (req, res) => {
    try {
      const newStep = await Step.findOneAndUpdate(
        { _id: req.params.stepId, _creator: req.user._id },
        { _isDone: false },
        { new: true }
      );
      res.send(newStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/step/edit/:stepId', requireAuth, async (req, res) => {
    try {
      const newStep = await Step.findOneAndUpdate(
        { _id: req.params.stepId, _creator: req.user._id },
        { ...req.body },
        { new: true }
      );
      res.send(newStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/step/delete_n_arrange', requireAuth, async (req, res) => {
    const { focusedStep, movedSteps, eventId } = req.body;

    try {
      const delStep = await Step.findByIdAndDelete(focusedStep);

      await Step.updateMany(
        { _id: { $in: [ ...movedSteps ] } },
        { $inc: { _rank: -1 } },
        { new: true }
      );
      
      const allStep = await Step.find({
        _event: eventId,
        _creator: req.user._id
      });
      res.send(allStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/step/rearrange', requireAuth, async (req, res) => {
    const { focusedStep, fromRank, toRank, movedSteps, eventId } = req.body;

    try {
      await Step.updateMany(
        { _id: { $in: [ ...movedSteps ] }, _creator: req.user._id },
        { $inc: { _rank: (fromRank > toRank) ? 1 : -1 } },
        { new: true }
      );
      
      await Step.findOneAndUpdate(
        { _id: focusedStep, _creator: req.user._id },
        { $inc: { _rank: (toRank - fromRank) } },
        { new: true }
      );

      const allStep = await Step.find({
        _event: eventId,
        _creator: req.user._id
      });
      res.send(allStep);
    } catch (error) {
      console.log(error);
      res.status(422).send();
    }
  });
};