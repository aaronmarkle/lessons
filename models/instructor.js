var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var instructorSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  beaches: String,
  bio: String,
  availableTimes: Object,
  picture: String
});

module.exports = mongoose.model('Instructor', instructorSchema);