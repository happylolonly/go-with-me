import Friend from '../model/friend';

export default app => {

    app.get('/api/friends', async (req, res) => {
        const friends = await Friend.find({})

        res.send(friends);
    });

    app.post('/api/friends', async (req, res) => {
        const { name, link } = req.body;


        const friend = new Friend({name, link        });

        try {
            const f = await friend.save();
            res.send(f);

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}
