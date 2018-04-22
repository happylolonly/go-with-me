// import Friend from '../models/friend';
import User from '../models/User';
const requireLogin = require('../middlewares/requireLogin');

export default app => {

    app.get('/api/friends', requireLogin,  async (req, res) => {
        const user = await User.findById(req.user._id);

        res.send(user.friends);
    });

    app.post('/api/friends',requireLogin, async (req, res) => {
        const { name, link } = req.body;

        const user = await User.findById(req.user._id);

        // const friend = new Friend({name, link        });


        try {
            // const f = await friend.save();

            const f = await User.update({_id: req.user._id }, { friends: [
                ...user.friends,
                {name, link}
            ]});
            res.send(f);

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}
