const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');

module.exports = (passport) => {
	passport.use(
		new FacebookStrategy(
			{
				clientID: keys.facebook_app_id,
				clientSecret: keys.facebook_app_secret,
				callbackURL: `${process.env.AUTH_REDIRECT_URL_BASE}/auth/facebook/callback`,
				profileFields: [ 'id', 'displayName', 'emails', 'photos' ],
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
						name: profile.displayName,
						avatar_url: profile.photos[0].value
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
