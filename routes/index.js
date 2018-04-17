var express = require('express');
var router = express.Router();

var map = require('../public/js/map');

var User = require('../models/user');



// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){	
	
	
	res.render('index', {username: req.user.name});
});

// Update
router.get('/update', ensureAuthenticated, function(req, res){
	
	res.render('update', {username: req.user.name, accident: req.user.accident, coolant: req.user.currCoolantKms, oil: req.user.currOilKms, tire: req.user.currTireKms, model: req.user.model});
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
	//console.log(map.lat);	
	var lati = req.body.lat;
	console.log(lati);
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
	var coolKms = req.user.currCoolantKms;
	var oilKms = req.user.currOilKms;
	var tireKms = req.user.currTireKms;
	var accident=req.user.accident;
	var latitude=19;
	var longitude=72;
	


	var name = req.user.name;
	if(total>coolKms && total>oilKms && total>tireKms) {
		var realCool = total - coolKms;
		var realOil = total - oilKms;
		var realTire = total - tireKms;
		console.log(realCool);
		console.log(realOil);
		console.log(realTire);
		User.updateOne({name: name}, {$set: {
		totalKms: total,
		realCoolantKms: realCool,
		realOilKms: realOil,
		realTireKms: realTire
	}}, function(err,res){
		if(err) throw err;
		console.log("1 document updated");
	});
	}
	else {
		req.flash('error_msg', 'Total Kms is less than current kms');
		res.render('needassistance');
	}
	//req.user.totalKms = total;
	//console.log(req.user);
	
var PythonShell = require('python-shell');
var options = {
    scriptPath: 'python',
    args: [latitude,longitude,total,accident,realCool,realOil,realTire],
};

PythonShell.run('predictor.py', options, function (err, results) {
  if (err) throw err;
  console.log('results: %j', results);
  var x;
  if(results == 0) {
		x = 'Accident';
  }
  else if(results == 1) {
	  x = 'Overheat';
  }
  else {
	  x = 'Tire';
  }
  
   res.render('result', {weather: x});
  });

	
});

router.post('/result', ensureAuthenticated, function(req,res) {
	var text = req.body.pred;
	if(text == 'Accident') {
		req.user.accident = req.user.accident+1;
	}
	//if(text == 'Accident')
		console.log(text);

	res.render('thankyou');
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