// import './modules/newrelic';

// import express from 'express';
// import mongoose from 'mongoose';
// import cron from 'node-cron';
// import moment from 'moment';
import mongoose from 'mongoose';
import path from 'path';
import axios from 'axios';

import db from './helpers/db';


const cookieSession = require('cookie-session');

const passport = require('passport');

const express = require('express');

// import config from './configs';

const app = express();
const port = process.env.PORT || 3090;

// var server = require('http').Server(app);

require('./models/User');

require('./services/passport');

app.listen(port, () => {
    console.log('Server ready on:', port);
});

const keys = {
    cookieKey: '123456',
}

db(mongoose);


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// 'use strict';
 
const ViberBot  = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
 const YOUR_AUTH_TOKEN_HERE = '47d1a00c4c27d5f8-d79140e8bd9e42d2-1093a7fa132fd7cf';

const bot    = new ViberBot({
    authToken: YOUR_AUTH_TOKEN_HERE,
    name: "EchoBot",
    avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

// https://vk.com/public165270834
 
// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    debugger;
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});
 
// Wasn't that easy? Let's create HTTPS server and set the webhook:
// const https = require('https');
// const port  = process.env.PORT || 8080;
 
// Viber will push messages sent to this URL. Web server should be internet-facing.
// const webhookUrl = process.env.WEBHOOK_URL;

app.use("/viber/webhook", bot.middleware());
 
// const httpsOptions = { key: ... , cert: ... , ca: ... }; // Trusted SSL certification (not self-signed).
// https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));

require('./middlewares').default(app, express);

require('./routes').default(app);



app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '/static/build/index.html'));
});


