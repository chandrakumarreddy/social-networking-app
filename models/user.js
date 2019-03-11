const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	joined: {
		type: Date,
		default: Date.now
	}
});
userSchema.pre("save", function(next) {
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});
module.exports = mongoose.model("User", userSchema);