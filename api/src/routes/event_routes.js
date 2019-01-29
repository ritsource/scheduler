const requireAuth = require('../middlewares/require_auth');
const clearCache = require('../middlewares/clear_cache');
const { eventHashKey } = require('../constants/hash_keys');

const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = (app) => {
  app.post('/api/event/new', requireAuth, clearCache(eventHashKey), async (req, res) => {
    console.log('RUN');
    
    try {
      const count = await Event.countDocuments({
        _creator: req.user._id,
      });

      let { date_from, date_to } = req.body;

      if (!date_from && date_to) date_from = req.body.date_to;
      else if (date_from && !date_to) date_to = req.body.date_from;
      else if (!date_from && !date_to) {
        date_from = new Date().setHours(0,0,0,0).valueOf();
        date_to = new Date().setHours(0,0,0,0).valueOf();
      }

      const newEvent = await new Event({
        ...req.body,
        date_from, 
        date_to,
        _rank: count,
        _creator: req.user._id,
      }).save();
      res.send(newEvent);
    } catch (error) {
      console.log(error.message);
      res.status(422).send();
    }
  });

  app.get('/api/event/all', requireAuth, async (req, res) => {
    try {
      const allEvent = await Event.find({
        _creator: req.user._id,
        _isDeleted: false
      }).cache({ key: req.user.id + eventHashKey });
      
      console.log('allEvent', allEvent[8]);      

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
        _creator: req.user._id,
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
        _creator: req.user._id,
        _isDeleted: false
      });
      res.send(allEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/done/:eventId', requireAuth, clearCache(eventHashKey), async (req, res) => {
    try {
      const newEvent = await Event.findOneAndUpdate(
        { _id: req.params.eventId, _creator: req.user._id },
        { _isDone: true },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/undo/:eventId', requireAuth, clearCache(eventHashKey), async (req, res) => {
    try {
      const newEvent = await Event.findOneAndUpdate(
        { _id: req.params.eventId, _creator: req.user._id },
        { _isDone: false },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/event/edit/:eventId', requireAuth, clearCache(eventHashKey), async (req, res) => {
    try {
      const newEvent = await Event.findOneAndUpdate(
        { _id: req.params.eventId, _creator: req.user._id },
        { ...req.body },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/event/edit_date/:eventId', requireAuth, clearCache(eventHashKey), async (req, res) => {
    try {
      let date_from, date_to;
      const oldEvent = await Event.findOne({ _id: req.params.eventId, _creator: req.user._id });
      if (req.body.date_from && req.body.date_from !== oldEvent.date_from) {
        date_from = req.body.date_from;
        date_to = oldEvent.date_to + (req.body.date_from - oldEvent.date_from)
      }
      if (req.body.date_to) {
        if (req.body.date_to < oldEvent.date_from) date_to = oldEvent.date_from;
        else date_to = req.body.date_to;
      }

      if (!date_from) date_from = oldEvent.date_from;
      if (!date_to) date_to = oldEvent.date_to;

      const newEvent = await Event.findOneAndUpdate(
        { _id: req.params.eventId, _creator: req.user._id },
        { date_from, date_to },
        { new: true }
      );
      res.send(newEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/event/delete/:eventId', requireAuth, clearCache(eventHashKey), async (req, res) => {
    try {
      const delEvent = await Event.findOneAndUpdate(
        { _id: req.params.eventId, _creator: req.user._id },
        { _isDeleted: true },
        { new: true }
      );
      res.send(delEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/event/rearrange', requireAuth, async (req, res) => {
    const { focusedEvent, fromRank, toRank, movedEvents } = req.body;

    try {
      await Event.updateMany(
        { _id: { $in: [ ...movedEvents ] }, _creator: req.user._id },
        { $inc: { _rank: (fromRank > toRank) ? 1 : -1 } },
        { new: true }
      );
      
      await Event.findOneAndUpdate(
        { _id: focusedEvent, _creator: req.user._id },
        { $inc: { _rank: (toRank - fromRank) } },
        { new: true }
      );

      const allEvent = await Event.find({
        _creator: req.user._id,
        _isDeleted: false
      });
      res.send(allEvent);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });
};