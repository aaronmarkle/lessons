var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var signup = require('./routes/signup.js');
var search = require('./routes/search.js');

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lessons');

//Passport Configuration

//Static Routes
app.use(express.static('public'));

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/public/signup.html');
});

app.use('/search', jsonParser, search);

app.use('/signup', jsonParser, signup);

app.listen((process.env.PORT || 8080), function(){
  console.log('server live on port 8080');
});