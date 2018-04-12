var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index', {username: req.user.name});
});

// Update
router.get('/update', ensureAuthenticated, function(req, res){
	res.render('update', {username: req.user.name});
});

// About
router.get('/about', ensureAuthenticated, function(req, res){
	var user = req.user.email;
	console.log(user);
	res.render('about', {username: req.user.name});
});

// Pitstop
router.get('/pitstop', ensureAuthenticated, function(req, res){
	res.render('pitstop', {username: req.user.name});
});

// NeedAssistance
router.get('/needassistance', ensureAuthenticated, function(req, res){
	res.render('needassistance', {username: req.user.name});
});

// Result
router.get('/result', ensureAuthenticated, function(req, res){
	res.render('result', {username: req.user.name});
});

// Other Result
router.get('/otherresult', ensureAuthenticated, function(req, res){
	res.render('otherresult', {username: req.user.name});
});

// Thank you
router.get('/thankyou', ensureAuthenticated, function(req, res){
	res.render('thankyou', {username: req.user.name});
});

// Update post
router.post('/update', ensureAuthenticated, function(req, res){
	var model = req.body.selectpicker;
	var tire = req.body.tire;
	var coolant = req.body.coolant;
	var oil = req.body.oil;
	var name = req.user.name;
	
	User.findByIdAndUpdate

	res.render('update');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;