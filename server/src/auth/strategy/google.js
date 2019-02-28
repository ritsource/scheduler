const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.google_client_id,
				clientSecret: keys.google_client_secret,
				callbackURL: `${process.env.AUTH_REDIRECT_URL_BASE}/auth/google/callback`,
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
						name: profile.displayName,
						avatar_url: profile._json.image.url
					}).save();

					await new Group({
						title: 'Tasks',
						_rank: 0,
						_isPermanent: true,
						_creator: newUser._id
					}).save();

					done(null, newUser);
				} catch (error) {
					done(error, null);
				}
			}
		)
	);
};
