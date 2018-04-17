import Event from '../model/event';

import sendVk from '../helpers/vk';

export default app => {

    app.get('/api/events', async (req, res) => {
        const events = await Event.find({})

        res.send(events);
    });

    app.post('/api/events', async (req, res) => {
        const { title, description, link, list } = req.body;

        const event = new Event({title, description, link, list        });

        try {
            const i = await event.save();

            debugger;

            await sendVk.send({
                title,
                description,
                link,
                list
            });
            
            res.send(i);


        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}