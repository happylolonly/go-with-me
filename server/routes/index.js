export default (app) => {

  app.get('/', (req, res, next) => {
    // if (req.originalUrl.slice(-1) != '/') return next();
    // res.sendFile(__dirname + '/../static/build/index.html');
  });


  require('./events').default(app);
  require('./friends').default(app);
  require('./lists').default(app);
  require('./auth')(app);
  // require('./logs')(app);

}
