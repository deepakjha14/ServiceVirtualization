var path = require('path');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expSession = require('express-session');
var User = require('../db/mongoAuth.js');
app = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));
router.use(expSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.find();
        console.log('in the local strategy');
        if (username === password) {
            console.log(' : '+username + ' - and password : ' + password + ' in the if statement');
            done(null, username);
        } else{
            done(null, null);
        }
    }
));

passport.serializeUser(function(user, done) {
    console.log('inside serializeuser method'+JSON.stringify(user));
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    console.log('inside deserialize user method');
    done(null, id);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}));

module.exports = router;
