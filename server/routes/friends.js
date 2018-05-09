// import Friend from '../models/friend';
import User from '../models/User';

// import Vk from '../models/Vk';
import Subscriber from '../models/Subscriber';

const requireLogin = require('../middlewares/requireLogin');

export default app => {

    app.get('/api/friends', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id);

        res.send(user.friends);
    });

    app.post('/api/friend-check', requireLogin,  async (req, res) => {
        const { value: link } = req.body;

        let find = null;

        if (link.includes('vk.com')) {
            // find = await Vk.find({ id: link.split('vk.com/')[1] });
            find = '';
        } else if (link.includes('facebook.com')) {
            find = await Subscriber.find({ userName: link.split('facebook.com/')[1], source: 'facebook' });
        } else if (link.includes('telegram.org')) {
            find = await Subscriber.find({ userName: link.split('telegram.org/')[1], source: 'telegram' });
        } else if (link.includes('viber.com')) {
            // find = await Fb.find({ userName: link.split('telegram.org/')[1] });
        }

        find && !Object.keys(find).length && (find = null);

        res.send({
            friend: !!find,
        });
    });

    app.post('/api/friends',requireLogin, async (req, res) => {
        const { name, link , source } = req.body;

        const user = await User.findById(req.user._id);

        // const friend = new Friend({name, link        });


        try {
            // const f = await friend.save();

            const f = await User.update({_id: req.user._id }, { friends: [
                ...user.friends,
                {name, link, source}
            ]});
            res.send(f);

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}
