const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Event = mongoose.model('Event');

const DEV_USER_ID = '5bfec3f0811f796770bdd133';

module.exports = (app) => {
  app.post('/api/event/new', requireAuth, async (req, res) => {
    try {
      const newEvent = await new Event({
        ...req.body,
        _creator: req.user ? req.user.id : DEV_USER_ID
      }).save();
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/event/all', requireAuth, async (req, res) => {
    try {
      const allEvent = await Event.find({
        _creator: req.user ? req.user.id : DEV_USER_ID,
        _isDeleted: false
      });
      res.send(allEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/event/:eventId', requireAuth, async (req, res) => {
    try {
      const theEvent = await Event.findOne({
        _id: req.params.eventId,
        _creator: req.user ? req.user.id : DEV_USER_ID
      });
      res.send(theEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/event/by/:groupId', requireAuth, async (req, res) => {
    try {
      const allEvent = await Event.find({
        _group: req.params.groupId,
        _creator: req.user ? req.user.id : DEV_USER_ID,
        _isDeleted: false
      });
      res.send(allEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/done/:eventId', requireAuth, async (req, res) => {
    try {
      const newEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        { _isDone: true },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/undo/:eventId', requireAuth, async (req, res) => {
    try {
      const newEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        { _isDone: false },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/event/edit/:eventId', requireAuth, async (req, res) => {
    try {
      const newEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        { ...req.body },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/delete/:eventId', requireAuth, async (req, res) => {
    try {
      const delEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        { _isDeleted: true },
        { new: true }
      );
      res.send(delEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });
};