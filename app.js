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


//Static Routes
app.get('/default.js', function(req, res) {
  res.sendFile(__dirname + '/default.js');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/main.jpg', function(req, res) {
  res.sendFile(__dirname + '/main.jpg');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/search', jsonParser, function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

app.post('/signup-submit', jsonParser, function(req, res) {
  Instructor.findOne({'email': req.body.email}, function(err, instructor) {
    if (err) {
      console.log('error has occurred searching for instructor');
    }
    if (instructor) {
      console.log('that email address is already in use');
    } else {
    var newInstructor = new Instructor({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      beaches: req.body.beaches
    });
    newInstructor.save(function(err) {
      if (err) throw err;
    });  
    }
  });
  res.json(req.body);
});

app.listen((process.env.PORT || 8080), function(){
  console.log('server live on port 8080');
});