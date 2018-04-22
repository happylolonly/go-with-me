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


    app.delete('/api/events', requireLogin, async (req, res) => {
        // const events = await Event.find({})
        const { id } = req.query;


        const user = await User.findById(req.user._id);

        const events = user.events.toObject();

        const e = events.filter(item => item._id.toString() !== id);

        const f = await User.update({_id: req.user._id }, { events: 
            e   });

        res.send('success');
    });


    app.get('/api/event', requireLogin, async (req, res) => {
        // const events = await Event.find({})

        const { id } = req.query;


        const user = await User.findById(req.user._id);

        const events = user.events.toObject();

        const event = events.filter(item => {
            return item._id.toString() === id;
        })[0];

        res.send(event);
    });
}
