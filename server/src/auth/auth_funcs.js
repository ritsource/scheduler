const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');

// User Login Function
const loginUser = async ({ email, password, req }) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', (err, user) => {
			if (err) return reject(err);

			if (user) {
				req.logIn(user, (err) => {
					if (err) return reject(err);

					if (user) user.password = null;
					resolve(user);
				});
			} else {
				return reject('Something went wrong');
			}
		})({ body: { email, password } });
	});
};

// ritwiksaha310@gmail.com

// User Register Function
const registerUser = async ({ name, email, password, req }) => {
	if (!email || !password) throw new Error('You must provide an email and password');

	// Querying existing user with the Email
	const oldUser = await User.findOne({ email, googleId: { $exists: false }, facebookId: { $exists: false } });
	if (oldUser) throw new Error('Email in use');

	// Saving new User
	const newUser = await new User({
		name,
		email,
		password,
		avatar_url: `/avatar_url/${name.match(/^[a-zA-Z]{1}/) ? name.split('')[0].toLowerCase() : 'a'}.png`
	}).save();

	await new Group({
		title: 'Tasks',
		_rank: 0,
		_isPermanent: true,
		_creator: newUser._id
	}).save();

	return new Promise((resolve, reject) => {
		req.logIn(newUser, (err) => {
			if (err) {
				reject(err);
			}

			if (newUser) newUser.password = null;
			resolve(newUser);
		});
	});
};

const addCustomColor = async ({ new_color }, req) => {
	return User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { custom_colors: new_color } }, { new: true });
};

module.exports = { registerUser, loginUser, addCustomColor };
