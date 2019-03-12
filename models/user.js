const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	bcrypt = require("bcrypt");

const userSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
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
	let user = this;
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model("User", userSchema);
