express = require('express');
var signup = express.Router();

var Instructor = require('../models/instructor.js');

signup.post('/', function(req, res) {
  Instructor.findOne({'email': req.body.email.toLowerCase()}, function(err, instructor) {
    if (err) {
      console.log('error has occurred searching for instructor');
    }
    if (instructor) {
      res.send({error: 'That email address is already in use.'})
    } else {
    var newInstructor = new Instructor({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      beaches: req.body.beaches,
      availableTimes: {
        '800': {'status': false},
        '1000': {'status': false},
        '1200': {'status': false},
        '1400': {'status': false},
        '1600': {'status': false}
      },
      picture: 'surfer.png'
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