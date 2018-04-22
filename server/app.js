// import './modules/newrelic';

// import express from 'express';
// import mongoose from 'mongoose';
// import cron from 'node-cron';
// import moment from 'moment';
import mongoose from 'mongoose';
const cookieSession = require('cookie-session');



const passport = require('passport');



const express = require('express');

import db from './helpers/db';
// import config from './configs';

const app = express();
const port = process.env.PORT || 3090;

require('./models/User');


const server = app.listen(port, () => {
  console.log('Server ready on:', port);
});

const keys = {
  cookieKey: '123456',
}

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);



app.use(passport.initialize());
app.use(passport.session());








// const API = require('node-vk-bot-api')

// const bot = new API('')

// bot.command('start', ({ reply }) => reply('This is start!'))
// bot.hears(/(car|tesla)/, ({ reply }) => reply('I love Tesla!'))
// bot.on(({ reply }) => reply('What?'))

// bot.listen()




// const FB =  require( 'facebook-messenger-bot');

// const  { Bot, Elements} = FB;
 
// const bot = new Bot(myPageAccessToken, myVerification);
 
// bot.on('message', async message => {
//     const {sender} = message;
//     await sender.fetch('first_name');
 
//     const out = new Elements();
//     out.add({text: `hey ${sender.first_name}, how are you!`});
 
//     await bot.send(sender.id, out);
// });
 
// const app = express();
// app.use('/facebook', bot.router());
// app.listen(3000);

require('./services/passport');




db(mongoose);

// require('./services/cache');

// require('./helpers/sockets').default(io);
require('./middlewares').default(app, express);
require('./routes').default(app);

app.use((req, res, next) => {
    // res.sendFile(path.join(__dirname, '/static/build/index.html'));
    res.send('item')
});
