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

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup-submit', jsonParser, function(req, res) {
  res.json(req.body);
});

app.listen(8080, function(){
  console.log('server live on port 8080');
});