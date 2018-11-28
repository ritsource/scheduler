const requireAuth = require('../middlewares/require_auth');

const mongoose = require('mongoose');
const Group = mongoose.model('Group');

const DEV_USER_ID = '5bfec3f0811f796770bdd133';

module.exports = (app) => {
  app.post('/api/group/new', requireAuth, async (req, res) => {
    try {
      const newGroup = await new Group({
        ...req.body,
        _creator: req.user ? req.user.id : DEV_USER_ID
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
        _creator: req.user ? req.user.id : DEV_USER_ID,
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
        _creator: req.user ? req.user.id : DEV_USER_ID
      });
      res.send(theGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });

  app.put('/api/group/edit/:groupId', requireAuth, async (req, res) => {
    try {
      const newGroup = await Group.findByIdAndUpdate(
        req.params.groupId,
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
      const delGroup = await Group.findByIdAndUpdate(
        req.params.groupId,
        { _isDeleted: true },
        { new: true }
      );
      res.send(delGroup);
    } catch (error) {
      // console.log(error);
      res.status(422).send();
    }
  });
};