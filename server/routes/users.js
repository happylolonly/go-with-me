import List from '../models/list';
const requireLogin = require('../middlewares/requireLogin');


export default app => {
    app.get('/api/user', (req, res) => {
        res.send(req.user);
    });   
}