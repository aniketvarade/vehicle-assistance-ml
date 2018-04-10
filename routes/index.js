var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

// Update
router.get('/update', ensureAuthenticated, function(req, res){
	res.render('update');
});

// About
router.get('/about', ensureAuthenticated, function(req, res){
	res.render('about');
});

// Pitstop
router.get('/pitstop', ensureAuthenticated, function(req, res){
	res.render('pitstop');
});

// NeedAssistance
router.get('/needassistance', ensureAuthenticated, function(req, res){
	res.render('needassistance');
});

// Result
router.get('/result', ensureAuthenticated, function(req, res){
	res.render('result');
});

// Other Result
router.get('/otherresult', ensureAuthenticated, function(req, res){
	res.render('otherresult');
});

// Thank you
router.get('/thankyou', ensureAuthenticated, function(req, res){
	res.render('thankyou');
});

// Update post
router.post('/update', ensureAuthenticated, function(req, res){
	var model = req.body.selectpicker;

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