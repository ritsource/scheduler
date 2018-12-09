const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: keys.facebook_app_id,
    clientSecret: keys.facebook_app_secret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const oldUser = await User.findOne({ facebookId: profile.id });

      if (oldUser) {
        return done(null, oldUser);
      }

      try {
        const newUser = await new User({
          facebookId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        }).save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  ));
}