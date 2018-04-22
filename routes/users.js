//import { model } from 'mongoose';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
// var userDetails = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// About
router.get('/about', function(req, res){
	res.render('about');
});

// FAQ
router.get('/faq', function(req, res){
	res.render('faq');
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var number = req.body.number;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	//req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			number: number,
			email:email,
			username: username,
			password: password,
			model: "Select Model",
			latitude: 0.00,
			longitude:0.00,
			totalKms: 0,
			accident:0,
			realCoolantKms: 0,
			realOilKms: 0,
			realTireKms: 0,
			currCoolantKms: 0,
			currOilKms: 0,
			currTireKms: 0,
			currentResult: 8,
			userResult: 5
		});

		// var newUserDetails = new userDetails({
		// 	name: name,
		// 	number: number,			
		// 	username: username,		
		// 	model: "Select Model",
		// 	latitude: 0.00,
		// 	longitude:0.00,
		// 	totalKms: 0,
		// 	accident:0,
		// 	realCoolantKms: 0,
		// 	realOilKms: 0,
		// 	realTireKms: 0,
		// 	currentResult: 8,
		// 	userResult: 5
		// });

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		// userDetails.createUserDetails(newUserDetails, function(err, user) {
		// 	if(err) throw err;
		// 	console.log(user);
		// });

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;