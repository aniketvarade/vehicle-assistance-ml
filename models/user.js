var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var bcrypt = require('bcryptjs');

// User Schema
var SchemaTypes = mongoose.SchemaTypes;
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	number: {
		type: Number,
		unique: true
	},
	name: {
		type: String
	},
	model: {
		type: String
	},
	latitude: {
		type: SchemaTypes.Double
	},
	longitude: {
		type: SchemaTypes.Double
	},
	totalKms: {
		type: Number
	},
	accident: {
		type: Number
	},
	realCoolantKms: {
		type: Number
	},
	realOilKms: {
		type: Number
	},
	realTireKms: {
		type: Number
	},
	currCoolantKms: {
		type: Number
	},
	currOilkms: {
		type: Number
	},
	currTireKms: {
		type: Number
	},	
	created: {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username : username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}