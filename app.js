var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lessons');
var Schema = mongoose.Schema;
var instructorSchema = new Schema({
  name: String,
  email: String,
  phone: String
});
var Instructor = mongoose.model('Instructor', instructorSchema);

//Static Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
  console.log('server live on port 8080');
});