express = require('express');
var search = express.Router();

var Instructor = require('../models/instructor.js');

search.post('/', function(req, res) {
  Instructor.find(req.body).exec(function(err, instructors) {
    availableInstructors = instructors;
    res.json(availableInstructors);
  });
});

module.exports = search;