express = require('express');
var signup = express.Router();

var Instructor = require('../models/instructor.js');

signup.post('/', function(req, res) {
  Instructor.findOne({'email': req.body.email}, function(err, instructor) {
    if (err) {
      console.log('error has occurred searching for instructor');
    }
    if (instructor) {
      res.send({error: 'That email address is already in use.'})
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
      if (err) {
        console.log('error saving instructor');
      }
      res.send({message: 'Form successfully submitted.  Please login to update your settings.'});
    });
    }
  });
});

module.exports = signup;