express = require('express');
var auth = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Instructor = require('../models/instructor.js');

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

auth.get('/login', passport.authenticate('local-login', {successRedirect: '/dashboard', failureRedirect: '/'}));

module.exports = auth;