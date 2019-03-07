const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password'
			},
			async (email, password, done) => {
				const oldUser = await User.findOne({
					email,
					googleId: { $exists: false },
					facebookId: { $exists: false }
				});

				if (oldUser) {
					bcrypt.compare(password, oldUser.password, (err, isMatch) => {
						if (err) return err;

						if (isMatch) return done(null, oldUser);
						else return done('Incorrect password', null);
					});
				} else {
					done('No user with this email', null);
				}
			}
		)
	);
};
