// import './modules/newrelic';

// import express from 'express';
// import mongoose from 'mongoose';
// import cron from 'node-cron';
// import moment from 'moment';
import mongoose from 'mongoose';
import path from 'path';
import axios from 'axios';

import db from './helpers/db';
// import tel from './helpers/tel';

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

require('./middlewares').default(app, express);

require('./routes').default(app);



app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '/static/build/index.html'));
});
