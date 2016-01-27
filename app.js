var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lessons');
var Schema = mongoose.Schema;
var instructorSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  beaches: String
});
var Instructor = mongoose.model('Instructor', instructorSchema);

//Passport Configuration
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use('local-signup', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
  Instructor.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, { message: 'Username is already taken.' });
    } else {
      var newInstructor = new Instructor();
      newInstructor.email = email;
      newInstructor.password = password;
      newInstructor.firstName = firstName;
      newInstructor.lastName = lastName;
      newInstructor.phone = phone;
      newInstructor.beaches = beaches;
      newInstructor.save(function(err) {
        if (err) {
          throw err;
        }
        return done(null, newInstructor);
      });
    }
  });
}));

//Static Routes
app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup-submit', jsonParser, function(req, res) {

  res.json(req.body);
});

app.listen(8080, function(){
  console.log('server live on port 8080');
});