const passport = require('passport');

module.exports = (app, APP_HOST) => {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // res.redirect('/');
      res.status(301).redirect(APP_HOST);
    });

  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // res.redirect('/');
      res.status(301).redirect(APP_HOST);
    });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    // res.redirect('/');
    res.status(301).redirect(APP_HOST);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};