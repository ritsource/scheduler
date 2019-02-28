const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Defining UserSchema
const UserSchema = new Schema({
	googleId: String,
	facebookId: String,
	password: String,
	email: String,
	name: String,
	avatar_url: String,
	custom_colors: [ { type: String } ],
	user_theme: { type: String }
});

// Making sure that password get's encoded before getting saved
UserSchema.pre('save', function save(next) {
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return err;

			user.password = hash;
			next();
		});
	});
});

// To compare passwords
UserSchema.methods.comparePassword = function comparePassword(passwordInput, cb) {
	bcrypt.compare(password, oldUser.password, (err, isMatch) => {
		if (err) return err;
		cb(err, isMatch);
	});
};

// User Model
const User = mongoose.model('User', UserSchema);

// Exporting
module.exports = { User };
