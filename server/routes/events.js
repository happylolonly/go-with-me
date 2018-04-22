// import Event from '../models/event';
import User from '../models/User';


import sendVk from '../helpers/vk';

const requireLogin = require('../middlewares/requireLogin');

export default app => {

    app.get('/api/events', requireLogin, async (req, res) => {
        // const events = await Event.find({})

        const user = await User.findById(req.user._id);

        res.send(user.events);
    });

    app.post('/api/events', requireLogin,  async (req, res) => {
        const { title, description, link, list } = req.body;

        const user = await User.findById(req.user._id);

        debugger


        const event = {title, description, link, list        };

        try {

            const f = await User.update({_id: req.user._id }, { events: [
                ...user.events,
                event
                
            ]});
            // res.send(f);

            await sendVk.send({
                title,
                description,
                link,
                list,
                id: req.user._id
            });

            debugger;

            // const user = await User.findById(req.user._id);

            res.send(event);
            
            // res.send(f);


        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}