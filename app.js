var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var winston = require('winston');
var passport = require('passport');
var index = require('./routes/index');
var books = require('./routes/books');
var products = require('./routes/products');
var sell = require('./routes/sell');
var session = require('express-session');

var app = express();
var hbsHelpers = require('./helpers/hbsHelpers');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//hbs helpers
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(path.join(__dirname, 'public/images', 'nightsky.jpg'));
app.use(express.static(path.join(__dirname + '/public/images')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret : 'Session'}));

//routing path specifications
require('./routes/index')(app, passport);
require('./passport/passport')(passport);
app.use('/books',books);
app.use('/products',products);
app.use('/sell',sell);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;