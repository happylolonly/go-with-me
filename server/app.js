// import './modules/newrelic';

// import express from 'express';
// import mongoose from 'mongoose';
// import cron from 'node-cron';
// import moment from 'moment';
import mongoose from 'mongoose';
const cookieSession = require('cookie-session');
import path from 'path';



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



const myPageAccessToken =  'EAADUBTfee4sBAFrgNqcRDVTC8dFUeGCzBO4HMoCgolH40JyLCPvdfwAhpYuWZC0ZBNjX1cvLmv5Cfd1eHZB25H6V0ZBfKDYgJxeYS1z1iGke4nYJvpId0XJ456WCUEJQR3mnPLNYyngEgb9U8L3S5vZAkU31XJ163PkBs3QLGxAZBAKf4msnaW'

// var MessengerPlatform = require('facebook-bot-messenger');

// // var app = require('express')();
// // var server = require('http').Server(app);
// var bot = MessengerPlatform.create({
//   pageID: 204430280346743,
//   appID: 233118877252491,
//   appSecret: 'a264bedfdf947099f332d6649b5b66d8',
//   validationToken: '<YOUR_VERIFY_TOKEN>123',
//   pageToken: myPageAccessToken,
// }, app);

const http = require('http')
const Bot = require('messenger-bot')
 
let bot = new Bot({
  token: myPageAccessToken,
  verify: '<YOUR_VERIFY_TOKEN>123',
  app_secret: 'a264bedfdf947099f332d6649b5b66d8'
})
 
bot.on('error', (err) => {
  console.log(err.message)
})
 
bot.on('message', (payload, reply) => {
  let text = payload.message.text
 
  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err
 
    reply({ text }, (err) => {
      if (err) throw err
 
      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})
 
app.use(bot.middleware());
// http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')

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


require('./services/passport');


db(mongoose);

// require('./services/cache');

// require('./helpers/sockets').default(io);
require('./middlewares').default(app, express);
require('./routes').default(app);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '/static/build/index.html'));
});
