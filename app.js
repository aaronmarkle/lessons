var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var signup = require('./routes/signup.js');

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lessons');

//Passport Configuration

//Static Routes
app.use(express.static('public'));

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/search', jsonParser, function(req, res) {
  Instructor.find(req.body).exec(function(err, instructors) {
    availableInstructors = instructors;
    res.json(availableInstructors);
  });
});

app.use('/signup-submit', jsonParser, signup);

app.listen((process.env.PORT || 8080), function(){
  console.log('server live on port 8080');
});