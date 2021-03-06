var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });
var signup = require('./routes/signup.js');
var search = require('./routes/search.js');
var auth = require('./routes/auth.js');

//Multer Configuration
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({storage: storage});

//Mongoose Configuration
var mongoose = require('mongoose');
mongoose.connect('mongodb://aaronmarkle:secretlessons@ds051595.mongolab.com:51595/surflessons');

//Passport Sessions Configuration
var passport = require('passport');
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

var Instructor = require('./models/instructor.js');
passport.deserializeUser(function(id, done) {
  Instructor.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(require('express-session')({
  secret: 'super secret session key',
  resave: false,
  saveUninitialized: true
}));

var theInitializer = passport.initialize();
app.use(theInitializer);
app.use(passport.session());

//Static Routes
app.use(express.static('public'));

app.use('/search', jsonParser, search);

app.use('/signup', jsonParser, signup);

app.get('/login', urlParser, auth);

app.get('/dashboard', function(req, res) {
  if (req.user) {
    res.sendFile(__dirname + '/public/dashboard.html');
  } else {
    res.redirect('/');
  }
});

app.get('/userinfo', function(req, res) {
  res.json(req.user);
});

app.post('/setBio', jsonParser, function(req, res) {
  var Instructor = require('./models/instructor.js');
  Instructor.findOneAndUpdate({email: req.user.email}, {bio: req.body.bio}, function(err, user) {
    if (err) {
      res.send({bioError: 'There was an erorr updating your bio, please try again later.'});
    } else {
      res.send({bioMessage: 'Your biography has been successfully updated.'});
    }
  });
});

app.post('/setTimes', jsonParser, function(req, res) {
  var Instructor = require('./models/instructor.js');
  Instructor.findOneAndUpdate({email: req.user.email}, {availableTimes: req.body.availableTimes}, function(err, user) {
    if (err) {
      res.send({timesError: 'There was an error updating your availability, please try again later.'});
    } else {
      res.send({timesMessage: 'Your availability has been successfully updated.'});
    }
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/upload', upload.single('file'), function(req, res) {
  var formattedPath = req.file.path.split('\\').pop().split('/').pop();
  var Instructor = require('./models/instructor.js');
  Instructor.findOneAndUpdate({email: req.user.email}, {picture: formattedPath}, function(err, user) {
    if (err) {
      res.send({imageError: 'There was an error updating your profile picture, please try again later.'});
    } else {
      res.send({imageMessage: 'Your profile picture has been successfully updated.'});
    }
  });
})

app.listen((process.env.PORT || 8080), function(){
  console.log('server live on port 8080');
});