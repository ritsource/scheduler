const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Group = mongoose.model('Group');

module.exports = (app) => {
  app.post('/api/group/new', requireAuth, async (req, res) => {
    try {
      const count = await Group.count({
        _creator: req.user._id,
      });
      // console.log(count);

      const newGroup = await new Group({
        ...req.body,
        _isPermanent: false,
        _rank: count,
        _creator: req.user._id
      }).save();
      res.send(newGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/group/all', requireAuth, async (req, res) => {
    console.log(req.user._id);
    
    try {
      const allGroups = await Group.find({
        _creator: req.user._id,
        _isDeleted: false
      });
      res.send(allGroups);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.get('/api/group/:groupId', requireAuth, async (req, res) => {
    try {
      const theGroup = await Group.findOne({
        _id: req.params.groupId,
        _creator: req.user._id,
        _isDeleted: false
      });
      res.send(theGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/group/edit/:groupId', requireAuth, async (req, res) => {
    try {
      const newGroup = await Group.findOneAndUpdate(
        {
          _id: req.params.groupId,
          _creator: req.user._id,
          _isPermanent: false
        },
        { ...req.body },
        { new: true }
      );
      res.send(newGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/group/delete/:groupId', requireAuth, async (req, res) => {
    try {
      const delGroup = await Group.findOneAndUpdate(
        {
          _id: req.params.groupId,
          _creator: req.user._id,
          _isPermanent: false
        },
        { _isDeleted: true },
        { new: true }
      );
      res.send(delGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/group/rearrange', requireAuth, async (req, res) => {
    const { focusedGroup, fromRank, toRank, movedGroups } = req.body;
    console.log({ focusedGroup, fromRank, toRank, movedGroups });

    try {
      await Group.updateMany(
        { _id: { $in: [ ...movedGroups ] }, _creator: req.user._id },
        { $inc: { _rank: (fromRank > toRank) ? 1 : -1 } },
        { new: true }
      );
      
      await Group.findOneAndUpdate(
        { _id: focusedGroup, _creator: req.user._id },
        { $inc: { _rank: (toRank - fromRank) } },
        { new: true }
      );

      const allGroup = await Group.find({
        _creator: req.user._id,
        _isDeleted: false
      });
      res.send(allGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });
};