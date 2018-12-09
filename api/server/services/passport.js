const passport = require('passport');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const facebookMiddleware = require('./strategy/facebook');
const googleMiddleware = require('./strategy/google');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

facebookMiddleware(passport);
googleMiddleware(passport);