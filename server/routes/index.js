import Subscriber from '../models/Subscriber';
import axios from 'axios';
import fb from '../helpers/fb';


export default (app) => {

    app.get('/', (req, res, next) => {
        // if (req.originalUrl.slice(-1) != '/') return next();
        // res.sendFile(__dirname + '/../static/build/index.html');
    });




    require('./events').default(app);
    require('./friends').default(app);
    require('./lists').default(app);
    require('./auth')(app);
    require('./users').default(app);
    // require('./logs')(app);


    // Adds support for GET requests to our webhook
    app.get('/webhook', (req, res) => {

        // Your verify token. Should be a random string.
        let VERIFY_TOKEN = "12345"

        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        // Checks if a token and mode is in the query string of the request
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }
    });


    app.post('/webhook', async (req, res) => {

        let body = req.body;

        axios.post(`${process.env.LOCALTUNNEL}`, body);

        // body = JSON.parse('"{"object":"page","entry":[{"id":"204430280346743","time":1525641387754,"messaging":[{"sender":{"id":"1673239386087268"},"recipient":{"id":"204430280346743"},"timestamp":1525632959921,"message":{"mid":"mid.$cAADjHnreAc1paBTNsVjNs-IlZiQH","seq":2786,"text":"sss"}}]}]}"');


        // Checks this is an event from a page subscription
        if (body.object === 'page') {

            // Iterates over each entry - there may be multiple if batched
            body.entry.forEach(async function (entry) {

                // Gets the message. entry.messaging is an array, but 
                // will only ever contain one message, so we get index 0
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                const { id } = webhook_event.sender;
                const text = webhook_event.message.text;

                const profile = await fb.getProfile(id);

                handleUser(text, profile.data, id, ({text}) => {
                    fb.sendMessage(id, text);
                });

            });

            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        } else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }

    });
}

async function handleUser(text, profile, chatId, done) {
    const { first_name: firstName, last_name: lastName } = profile;

    if (text.includes('https://www.facebook.com/')) {
        const username = text.split('https://www.facebook.com/')[1];

        const id = await getId(username);

        const existingUser = await Subscriber.findOne({ id: id, source: 'facebook' });

        if (existingUser) {

            await Subscriber.findByIdAndUpdate(existingUser._id, {
                firstName,
                lastName,
                userName: username,
                chatId
            });

        } else {

            await new Subscriber({
                id: id,
                chatId,
                firstName,
                lastName,
                userName: username,
                source: 'facebook'
            }).save();

        }
        done({ text: 'Спасибо, мы тебя сохранили!' });

    } else {
        done({ text: 'Привет, отправь плз свою ссылку на профиль' });
    }
}



async function getId(name) {

    return new Promise(async resolve => {

        let page = await axios.get(`https://www.facebook.com/${name}`);

        page = page.data;

        const s = page.indexOf('entity_id');
        const e = page.indexOf('&', s);

        const id = page.substring(s + 10, e);

        resolve(id);

    });
}

