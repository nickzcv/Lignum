const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const database = require('./config/database');
require('./config/passport');


app.use(favicon(__dirname + '/app/img/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Root directory from which the static assets are to be served.
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static('pr'));

app.use(passport.initialize());

// DB connect
database.connect();

// logger
app.use(morgan('common'));

// API
var company = require(path.join(__dirname, 'routes/company'));
app.use('/api', company);
var user = require(path.join(__dirname, 'routes/user'));
app.use('/api', user);
var ad = require(path.join(__dirname, 'routes/ad'));
app.use('/api', ad);
//var admin = require(path.join(__dirname, 'routes/admin'));
//app.use('/api', admin);
var uploader = require(path.join(__dirname, 'routes/upload'));
app.use('/api', uploader);
var home = require(path.join(__dirname, 'routes/home'));
app.use('/api', home);

app.get('/pr', function (req, res) {
  res.sendFile(path.join(__dirname, 'pr/index.html'));
});

// Otherwise render the index.html page for the Backbone SPA
// This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


app.listen(port);
console.log('Server started on port: ' + port);