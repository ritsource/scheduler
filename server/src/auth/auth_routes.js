const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateUserToken = require('../middlewares/gen_email_token');
const sendEmail = require('../services/nodemailer');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
	// For Google Login
	app.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

	// For Google Login
	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
		res.redirect('/calendar');
	});

	// For Facebook Login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

	// For Facebook Login
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(
		req,
		res
	) {
		res.redirect('/calendar');
	});

	// For Logout
	app.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});

	app.post('/auth/request_a_mail', generateUserToken, sendEmail, (req, res) => {
		try {
			res.status(200).send({ message: 'Email has been sent' });
		} catch (error) {
			res.status(500).send({ message: 'Something went wrong' });
		}
	});

	app.post('/auth/password_reset', async (req, res) => {
		const { email, _id } = jwt.verify(req.body.token, keys.email_token_key);

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, async (err, hash) => {
				if (err) return err;
				const password = hash;

				try {
					const newUser = await User.findOneAndUpdate({ email, _id }, { password: password }, { new: true });

					newUser.password = null;
					res.send(newUser);
				} catch (error) {
					// console.log(error.message);
					res.status(422).send();
				}
			});
		});
	});
};
