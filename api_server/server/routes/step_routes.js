const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Step = mongoose.model('Step');

const DEV_USER_ID = '5bfec3f0811f796770bdd133';

module.exports = (app) => {
  app.post('/api/step/new', requireAuth, async (req, res) => {
    try {
      const newStep = await new Step({
        ...req.body,
        _creator: req.user ? req.user.id : DEV_USER_ID
      }).save();
      res.send(newStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/step/all', requireAuth, async (req, res) => {
    try {
      const allStep = await Step.find({
        _creator: req.user ? req.user.id : DEV_USER_ID,
        _isDeleted: false
      });
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
        _creator: req.user ? req.user.id : DEV_USER_ID,
        _isDeleted: false
      });
      res.send(allStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/step/done/:stepId', requireAuth, async (req, res) => {
    try {
      const newStep = await Step.findByIdAndUpdate(
        req.params.stepId,
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
      const newStep = await Step.findByIdAndUpdate(
        req.params.stepId,
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
      const newStep = await Step.findByIdAndUpdate(
        req.params.stepId,
        { ...req.body },
        { new: true }
      );
      res.send(newStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.delete('/api/step/delete/:stepId', requireAuth, async (req, res) => {
    try {
      const delStep = await Step.findByIdAndDelete(req.params.stepId);
      res.send(delStep);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });
};