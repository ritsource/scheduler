const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Event = mongoose.model('Event');

module.exports = (app) => {
  app.post('/api/event/new', requireAuth, async (req, res) => {
    try {
      const count = await Event.count({
        _creator: req.user._id,
      });
            
      const newEvent = await new Event({
        ...req.body,
        _rank: count,
        _creator: req.user._id,
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
        _creator: req.user._id,
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

  app.patch('/api/event/done/:eventId', requireAuth, async (req, res) => {
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

  app.patch('/api/event/undo/:eventId', requireAuth, async (req, res) => {
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

  app.put('/api/event/edit/:eventId', requireAuth, async (req, res) => {
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

  app.put('/api/event/edit_date/:eventId', requireAuth, async (req, res) => {
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

  app.patch('/api/event/delete/:eventId', requireAuth, async (req, res) => {
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