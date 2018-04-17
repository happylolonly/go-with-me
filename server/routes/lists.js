import List from '../model/list';

export default app => {

    app.get('/api/lists', async (req, res) => {
        const lists = await List.find({})

        res.send(lists);
    });

    app.post('/api/lists', async (req, res) => {
        const { title, listFriends:friends} = req.body;

        const list = new List({title, friends        });

        try {
            const e = await list.save();
            res.send(e);

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
}