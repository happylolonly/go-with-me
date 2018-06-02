// import List from '../models/list';
import User from '../models/User';

const requireLogin = require('../middlewares/requireLogin');

export default app => {

    app.get('/api/lists', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id)

        res.send(user.lists);
    });

    app.get('/api/list', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id)

        const { id } = req.query;

        const list = user.lists.find(item => item.id === id);

        res.send(list);
    });

    app.delete('/api/list', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id)

        const { id } = req.query;

        // const list = user.lists.find(item => item._id === id);


        const lists = user.lists.filter(item => item._id.toString() !== id);

        const f = await User.update({_id: req.user._id }, { lists: 
            lists   });

        res.send('success');

        // res.send(list);
    });

    app.put('/api/list', requireLogin, async (req, res) => {
        const { title, listFriends:friends, id } = req.body;

        const user = await User.findById(req.user._id);

        const lists = user.toObject().lists;

        let list = lists.find(item => item._id.toString() === id);
        
        // list = 

        const index = lists.indexOf(list);

        lists[index] = { ...list, title, friends };


        // const list = new List({title, friends        });

        try {

            const f = await User.update({_id: req.user._id }, { lists: [
                ...lists,
            ]});
            res.send(f);


        } catch (error) {
            console.log(error);
            res.send(error);
        }
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
