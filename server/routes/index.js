export default (app) => {

  


  require('./events').default(app);
  require('./friends').default(app);
  require('./lists').default(app);
  require('./auth')(app);
  require('./users').default(app);
  // require('./logs')(app);


  // app.get('/webhook', (req, res) => {

  //   debugger;

  //   // Your verify token. Should be a random string.
  //   let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"
      
  //   // Parse the query params
  //   let mode = req.query['hub.mode'];
  //   let token = req.query['hub.verify_token'];
  //   let challenge = req.query['hub.challenge'];
      
  //   // Checks if a token and mode is in the query string of the request
  //   if (mode && token) {
    
  //     // Checks the mode and token sent is correct
  //     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
  //       // Responds with the challenge token from the request
  //       console.log('WEBHOOK_VERIFIED');
  //       res.status(200).send(challenge);
      
  //     } else {
  //       // Responds with '403 Forbidden' if verify tokens do not match
  //       res.sendStatus(403);      
  //     }
  //   }
  // });


  // app.post('/webhook', (req, res) => {  
 
  //   let body = req.body;
  
  //   // Checks this is an event from a page subscription
  //   if (body.object === 'page') {
  
  //     // Iterates over each entry - there may be multiple if batched
  //     body.entry.forEach(function(entry) {
  
  //       // Gets the message. entry.messaging is an array, but 
  //       // will only ever contain one message, so we get index 0
  //       let webhook_event = entry.messaging[0];
  //       console.log(webhook_event);
  //     });
  
  //     // Returns a '200 OK' response to all requests
  //     res.status(200).send('EVENT_RECEIVED');
  //   } else {
  //     // Returns a '404 Not Found' if event is not from a page subscription
  //     res.sendStatus(404);
  //   }
  
  // });




const myPageAccessToken =  'EAADUBTfee4sBAFrgNqcRDVTC8dFUeGCzBO4HMoCgolH40JyLCPvdfwAhpYuWZC0ZBNjX1cvLmv5Cfd1eHZB25H6V0ZBfKDYgJxeYS1z1iGke4nYJvpId0XJ456WCUEJQR3mnPLNYyngEgb9U8L3S5vZAkU31XJ163PkBs3QLGxAZBAKf4msnaW'

var MessengerPlatform = require('facebook-bot-messenger');

// var app = require('express')();
// var server = require('http').Server(app);
var bot = MessengerPlatform.create({
  pageID: 204430280346743,
  appID: 233118877252491,
  appSecret: 'a264bedfdf947099f332d6649b5b66d8',
  validationToken: '<YOUR_VERIFY_TOKEN>123',
  pageToken: myPageAccessToken,
}, app);
app.use(bot.webhook('/webhook'));
bot.on(MessengerPlatform.Events.MESSAGE, function(userId, message) {
    console.log('ds');
    console.log(userId, message );
  // add code below.
});


  app.get('/', (req, res, next) => {
    // if (req.originalUrl.slice(-1) != '/') return next();
    // res.sendFile(__dirname + '/../static/build/index.html');
  });

}
