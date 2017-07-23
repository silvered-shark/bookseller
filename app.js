var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser = require('body-parser');
var winston = require('winston');

var index = require('./routes/index');

var app = express();
var argv = require('minimist')(process.argv.slice(2));

// creating a new subpath
var subpath = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile',
        failureRedirect: '/' }));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/profile');
    });


//adding subpath for swagger
app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('dist'));
swagger.setApiInfo({
    title: "Bookseller API",
    description: "Rest API to mange their handling",
    termsOfServiceUrl: "",
    contact: "",
    license: "",
    licenseUrl: ""
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
swagger.configureSwaggerPaths('', 'api-docs', '');
swagger.configure('localhost:3000', '1.0.0');


//routing path specifications
app.use('/', index);
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
