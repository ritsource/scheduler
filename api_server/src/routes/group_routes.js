const requireAuth = require('../middlewares/require_auth');
const clearCache = require('../middlewares/clear_cache');
const { groupHashKey } = require('../constants/hash_keys');
const { group_color_list } = require('../constants/colors');

const mongoose = require('mongoose');
const Group = mongoose.model('Group');

// console.log('FF', group_color_list[Math.floor(Math.random() * 5)]);

module.exports = (app) => {
  app.post('/api/group/new', requireAuth, clearCache(groupHashKey), async (req, res) => {
    try {
      const hex_color = group_color_list[Math.floor(Math.random() * 5)];

      const count = await Group.countDocuments({
        _creator: req.user._id,
      });

      const newGroup = await new Group({
        ...req.body,
        hex_color,
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
    try {
      const allGroups = await Group.find({
        _creator: req.user._id,
        _isDeleted: false
      }).cache({ key: req.user.id + groupHashKey });

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

  app.put('/api/group/edit/:groupId', requireAuth, clearCache(groupHashKey), async (req, res) => {
    try {
      const newGroup = await Group.findOneAndUpdate(
        { _id: req.params.groupId, _creator: req.user._id },
        { ...req.body },
        { new: true }
      );
      res.send(newGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.patch('/api/group/delete/:groupId', requireAuth, clearCache(groupHashKey), async (req, res) => {
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

  app.put('/api/group/rearrange', requireAuth, clearCache(groupHashKey), async (req, res) => {
    const { focusedGroup, fromRank, toRank, movedGroups } = req.body;
    // console.log({ focusedGroup, fromRank, toRank, movedGroups });

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