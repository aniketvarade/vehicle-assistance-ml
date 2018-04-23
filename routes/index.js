var express = require('express');
var router = express.Router();

var map = require('../public/js/map');
var PythonShell = require('python-shell');

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
	res.render('about', {username: req.user.name});
});

//FAQ
router.get('/faq', ensureAuthenticated, function(req, res){
	res.render('faq', {username: req.user.name});
});

// NeedAssistance
router.get('/needassistance', ensureAuthenticated, function(req, res){
	//console.log(map.lat);	

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

// abc
router.get('/abc', ensureAuthenticated, function(req, res){
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
		req.flash('success_msg', 'Details updated successfully');

	res.redirect('/update');
});

router.post('/needassistance', ensureAuthenticated, function(req,res){
	var total = req.body.total;
	var coolKms = req.user.currCoolantKms;
	var oilKms = req.user.currOilKms;
	var tireKms = req.user.currTireKms;
	var accident=req.user.accident;
	var latitude=19.044231500000002;
	var longitude=72.82059989999999;



	var name = req.user.name;
	if(total>coolKms && total>oilKms && total>tireKms) {
		var realCool = total - coolKms;
		var realOil = total - oilKms;
		var realTire = total - tireKms;
		User.updateOne({name: name}, {$set: {
		totalKms: total,
		realCoolantKms: realCool,
		realOilKms: realOil,
		realTireKms: realTire,
		latitude:latitude,
		longitude:longitude
	}}, function(err,res){
		if(err) throw err;
		console.log("Real values calculated and updated in mongoDB");
	});


		
		var options = {
    		scriptPath: 'python',
    		args: [latitude,longitude,total,accident,realCool,realOil,realTire],
		};

		PythonShell.run('predictor.py', options, function (err, results) {
  		if (err) throw err;
  		console.log('results: %j', results);
		  var x,y;
		  
  		if(results == 0) {
			x = 'Accident';
			y=0;
  		}
  		else if(results == 1) {
			  x = 'Overheat';
			  y=1;
  		}
  		else {
			  x = 'Tire';
			  y=2;
		}
		console.log('Predicted Result (currentResult) =',y);
		
			User.updateOne({name:name}, {$set: 
				{currentResult: y}
			},function(err,docs) {
				if(err) throw err;
				
			});
		  res.render('result', {weather: x, username: req.user.name});
  		});
	}
	else {
		
		req.flash('error_msg', 'Total Kms is less than current kms');
		res.redirect('/needassistance');
	}
	//req.user.totalKms = total;
	//console.log(req.user);
	

  
   

	
});

router.post('/result', ensureAuthenticated, function(req,res) {
	var text = req.body.pred;
	var name = req.user.name;
	var currResult = req.user.currentResult;
	var userResult1=0;
	var userResult2=1;
	var userResult3=2;
	var total=req.user.totalKms;
	var accident=req.user.accident;
	var rcoolKms=req.user.realCoolantKms;
	var roilKms=req.user.realOilKms;
	var rtireKms=req.user.realTireKms;
	var latitude=req.user.latitude;
	
	var longitude=req.user.longitude;
	
	var accident = req.user.accident;
	if(text=='Accident'|| text == 'Overheat' ||text == 'Tire' ){
	if(text == 'Accident') {
		accident = accident+1;
		User.findOneAndUpdate({name:name}, {$set: 
			{accident: accident,
			userResult: userResult1}
		},function(err,docs) {
			if(err) throw err;
			console.log("Accident = "+accident);
			console.log("User Result = 0");
		});
		var userResult=userResult1;
		console.log("user result is"+userResult)
		
		var accoptions = {
			scriptPath: 'python',
			args: [latitude,longitude,total,accident,rcoolKms,roilKms,rtireKms,userResult]
		};
		
		PythonShell.run('csvUpdater.py', accoptions, function (err, results) {
		  if (err) throw err;
		  console.log('csv updater: %j', results);
		});
	}
	else if(text == 'Overheat') {
		User.findOneAndUpdate({name:name}, {$set: 
			{ userResult:userResult2}
		},function(err,docs) {
			if(err) throw err;
			console.log("User Result = 1");
		});
		var userResult=userResult2;
		console.log("user result is"+userResult)
		
		var accoptions = {
			scriptPath: 'python',
			args: [latitude,longitude,total,accident,rcoolKms,roilKms,rtireKms,userResult]
		};
		
		PythonShell.run('csvUpdater.py', accoptions, function (err, results) {
		  if (err) throw err;
		  console.log('csv updater: %j', results);
		});
	}
	else {
		User.findOneAndUpdate({name:name}, {$set: 
			{ userResult: userResult3 }
		},function(err,docs) {
			if(err) throw err;
			console.log("User Result = 2");
		});
		var userResult=userResult3;

		var accoptions = {
			scriptPath: 'python',
			args: [latitude,longitude,total,accident,rcoolKms,roilKms,rtireKms,userResult]
		};
		
		PythonShell.run('csvUpdater.py', accoptions, function (err, results) {
		  if (err) throw err;
		  console.log('csv updater: %j', results);
		});
		
	}
	//if(text == 'Accident')
	

	
	
PythonShell.run('python/accuracy.py', function (err,result) {
  if (err) throw err;
  
  console.log('Accuracy is at %s', result);
 
});
var options = {
	scriptPath: 'python',
	args: [currResult,userResult],
};

PythonShell.run('accuracyCsvupdater.py',options, function (err, result) {
  if (err) throw err;
  console.log('acccsv updater: %j', result);
});
	}



res.render('thankyou', {username: req.user.name});
});

//to render 2 buttons for other..current op is predicted op
router.post('/otherresult', ensureAuthenticated, function(req,res) {
	var name = req.user.name;
	var currentOp = req.user.currentResult;
	if(currentOp===0){
		res1='Overheat';
		res2='Tire';
	}
	if(currentOp===1){
		res1='Accident';
		res2='Tire';
	}
	else if(currentOp===2){
		res1='Accident';
		res2='Overheat';
	}
	
	//if(text == 'Accident')

	res.render('otherresult', {res1:res1,res2:res2,username: req.user.name});
});

// router.post('/thankyou', ensureAuthenticated, function(req,res){
// 	var total = req.user.totalKms;
// 	var rcoolKms = req.user.realCoolantKms;
// 	var roilKms = req.user.realOilKms;
// 	var rtireKms = req.user.realTireKms;
// 	var accident=req.user.accident;
// 	var latitude=19.182755;
// 	var longitude=72.840157;
// 	var currResult = req.user.currentResult;
// 	var name = req.user.name;
// 	var txt = req.body.tire;
// 	var userResult=req.user.userResult;
// 	if(txt == 'Accident') {
// 		User.updateOne({name:name}, {$set: 
// 			{userResult: 0}
// 		},function(err,docs) {
// 			if(err) throw err;
// 			console.log("User Result = 0");
// 		});
// 	}
// 	else if(txt == 'Overheat'){
// 		User.updateOne({name:name}, {$set: 
// 			{userResult: 1}
// 		},function(err,docs) {
// 			if(err) throw err;
// 			console.log("User Result = 1");
// 		});
// 	}
// 	else{
// 		User.updateOne({name:name}, {$set: 
// 			{userResult: 2}
// 		},function(err,docs) {
// 			if(err) throw err;
// 			console.log("User Result = 2");
// 		});
// 	}

// 	var options = {
// 		scriptPath: 'python',
// 		args: [latitude,longitude,total,accident,rcoolKms,roilKms,rtireKms,currResult],
// 	};

// 	PythonShell.run('csvUpdater.py', options, function (err, results) {
// 	  if (err) throw err;
// 	  console.log('csv updater: %j', results);
// 	});

	

	

// 	res.render('thankyou', {username: req.user.name});
	
// });

router.post('/abc', ensureAuthenticated, function(req,res){
	var total = req.user.totalKms;
	var rcoolKms = req.user.realCoolantKms;
	var roilKms = req.user.realOilKms;
	var rtireKms = req.user.realTireKms;
	var accident=req.user.accident;
	var currResult=req.user.currentResult;
	var latitude=19.044231500000002;
	var longitude=72.82059989999999;
	var userResult = req.user.userResult;
	var name = req.user.name;
	var txt = req.body.overheat;
	if(txt == 'Accident') {
		userResult = 0;
		User.updateOne({name:name}, {$set: 
			{userResult: 0}
		},function(err,docs) {
			if(err) throw err;
			console.log("User Result = 0");
		});
	}
	else if(txt == 'Overheat'){
		userResult = 1;
		User.updateOne({name:name}, {$set: 
			{userResult: 1}
		},function(err,docs) {
			if(err) throw err;
			console.log("User Result = 1");
		});
	}
	else{
		userResult = 2;
		User.updateOne({name:name}, {$set: 
			{userResult: 2}
		},function(err,docs) {
			if(err) throw err;
			console.log("User Result = 2");
		});
	}

	var options = {
		scriptPath: 'python',
		args: [latitude,longitude,total,accident,rcoolKms,roilKms,rtireKms,userResult],
	};

	PythonShell.run('csvUpdater.py', options, function (err, results) {
	  if (err) throw err;
	  console.log('csv updater: %j', results);
	});
	var accoptions = {
		scriptPath: 'python',
		args: [currResult,userResult],
	};
	
	PythonShell.run('accuracyCsvupdater.py',accoptions, function (err, result) {
	  if (err) throw err;
	  console.log('accuracy csv updater works: %j', result);
	});



	PythonShell.run('python/accuracy.py', function (err,result) {
		if (err) throw err;
		
		console.log('Accuracy is at %s', result);
	   
	  });

	res.render('thankyou', {username: req.user.name});
	
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