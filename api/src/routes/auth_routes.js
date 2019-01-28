const passport = require('passport');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const requireAuth = require('../middlewares/require_auth');

module.exports = (app) => {
  app.post('/auth/register', async (req, res) => {
    const oldUser = await User.findOne({
      email: req.body.email,
      googleId: { $exists: false },
      facebookId: { $exists: false }
    });

    if (oldUser) return res.status(409).send({ message: 'Email has already been in use' });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) return err;
        const password = hash;
        const avatar_url = `/avatar_url/${req.body.name[0].toLowerCase().match(/[a-z]/i) ? req.body.name[0].toLowerCase() : 'x'}.png`;

        try {
          const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password,
            avatar_url
          }).save();

          await new Group({
            title: 'Tasks',
            _rank: 0,
            _isPermanent: true,
            _creator: newUser._id
          }).save();

          // const xUser = _.omit(newUser, ['password']);
          newUser.password = null;
          res.send(newUser);
        } catch (error) {
          // console.log(error.message);        
          res.status(422).send();
        }

      });
    });
  });

  app.post('/auth/local', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/api/current_user',
      failureRedirect: '/api/current_user'
    })(req, res, next);
  });

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
      // res.status(301).redirect(APP_HOST);
    });

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
      // res.status(301).redirect(APP_HOST);
    });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    // res.status(301).redirect(APP_HOST);
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user) req.user.password = null;    
    res.send(req.user);
  });

  app.post('/api/add_custom_colors', requireAuth, async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { custom_colors: req.body.new_color }},
        { new: true }
      );
      res.redirect('/api/current_user');
    } catch (e) {
      console.log(e.message);      
      res.status(422).send();
    }
  });
};