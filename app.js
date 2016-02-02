var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });
var signup = require('./routes/signup.js');
var search = require('./routes/search.js');

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://aaronmarkle:secretlessons@ds051595.mongolab.com:51595/surflessons');
var Instructor = require('./models/instructor.js');
//Passport Configuration
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login', new LocalStrategy(function(username, password, done) {
  Instructor.findOne({email: username}, function(err, user){
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Instructor.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(require('express-session')({
  secret: 'super secret session key',
  resave: false,
  saveUninitialized: true
}));

var theInitializer = passport.initialize();
app.use(theInitializer);
app.use(passport.session());

//Static Routes
app.use(express.static('public'));

app.use('/search', jsonParser, search);

app.use('/signup', jsonParser, signup);

app.post('/login', urlParser, passport.authenticate('local-login', {successRedirect: '/success', failureRedirect: '/failure'}));

app.listen((process.env.PORT || 8080), function(){
  console.log('server live on port 8080');
});