// import List from '../models/list';
import User from '../models/User';

const requireLogin = require('../middlewares/requireLogin');

export default app => {

    app.get('/api/lists', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id)

        res.send(user.lists);
    });

    app.post('/api/lists', requireLogin, async (req, res) => {
        const { title, listFriends:friends} = req.body;

        const user = await User.findById(req.user._id)


        // const list = new List({title, friends        });

        try {

            const f = await User.update({_id: req.user._id }, { lists: [
                ...user.lists,
                {title, friends}
            ]});
            res.send(f);


        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}