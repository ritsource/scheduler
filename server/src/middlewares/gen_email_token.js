const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {
	const theUser = await User.findOne({
		email: req.body.email,
		googleId: { $exists: false },
		facebookId: { $exists: false }
	});

	if (!theUser) {
		return res.status(422).send({ message: 'User not found.' });
	}

	const tokenObj = { email: theUser.email, _id: theUser._id };
	const secret = keys.email_token_key;

	const userToken = jwt.sign(tokenObj, secret, { expiresIn: '15m' });

	req.body.link = `${process.env.AUTH_REDIRECT_URL_BASE}/reset_password?token=${userToken}`;
	next();
};
