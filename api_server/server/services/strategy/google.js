const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: keys.google_client_id,
      clientSecret: keys.google_client_secret,
      callbackURL: '/auth/google/callback',
      // passReqToCallback: true,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {      
      const oldUser = await User.findOne({ googleId: profile.id });

      if (oldUser) {
        return done(null, oldUser);
      }

      try {
        const newUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        }).save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  ));
};