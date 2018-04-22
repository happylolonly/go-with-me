const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('vkontakte', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('vkontakte'),
    (req, res) => {
      res.redirect('http://localhost:3000/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};