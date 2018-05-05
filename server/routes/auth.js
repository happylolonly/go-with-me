const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/vk',
        passport.authenticate('vkontakte', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/vk/callback',
        passport.authenticate('vkontakte'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
