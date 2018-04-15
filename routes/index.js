var express = require('express');
var router = express.Router();

var User = require('../models/user');
var self = this;
var user1;
User.find({name : self.name}, function(err,docs){
	if(err) throw err;
	user1 = self.name;
});

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log(user1);
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
	var accident = req.body.accident;
	var tire = req.body.tire;
	var coolant = req.body.coolant;
	var oil = req.body.oil;
	var name = req.user.name;
	
	/*req.user.model = model;
	req.user.accident = accident;
	req.user.currCoolantKms = coolant;
	req.user.currOilKms = oil;
	req.user.currTireKms = tire;*/

	User.updateOne({name : name}, {$set: {
		model: model, 
		accident: accident, 
		currCoolantKms: coolant,
		currTireKms: tire,
		currOilKms: oil
		}}, function(err,res){
			if(err) throw err;
			console.log("1 document updated");
		});

	res.redirect('/update');
});

router.post('/needassistance', ensureAuthenticated, function(req,res){
	var total = req.body.total;
	var name = req.user.name;
	req.user.totalKms = total;
	//console.log(req.user);

	User.updateOne({name: user1}, {$set: {
		totalKms: total
	}}, function(err,res){
		if(err) throw err;
		console.log("1 document updated");
	});

	res.redirect('/result');
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