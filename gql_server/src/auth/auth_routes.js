const passport = require('passport');

module.exports = (app) => {
	// For Google Login
	app.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

	// For Google Login
	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
		res.redirect('/');
	});

	// For Facebook Login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

	// For Facebook Login
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(
		req,
		res
	) {
		res.redirect('/');
	});

	// For Logout
	app.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};
