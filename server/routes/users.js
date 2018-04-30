import User from '../models/User';
const requireLogin = require('../middlewares/requireLogin');


export default app => {
    app.get('/api/auth', (req, res) => {
        res.send(req.user ? true : false);
    });

    app.get('/api/user', requireLogin, (req, res) => {
        res.send(req.user);
    });
}
