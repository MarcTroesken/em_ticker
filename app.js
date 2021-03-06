var express = require('express');
var hbs = require('hbs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
// var passportConfig = require('./config/passport')(passport);

var routes = require('./routes/index');
var channelsRoutes = require('./routes/channels');

var app = express();

// Register locals
var irc = require('irc');
var config = require('./config');
var channels = require('./config/channels');

channels().then(names => {
  app.locals.irc = new irc.Client('irc.chat.twitch.tv', 'em_ticker', {
      channels: names,
      password: config.oAuth
  });

  var Cron = require('./config/cron')(app.locals.irc);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'assets'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
  // outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SomeRandomString',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/channels', channelsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
