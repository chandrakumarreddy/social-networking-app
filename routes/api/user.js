const mongoose = require("mongoose"),
	User = mongoose.model("User"),
	router = require("express").Router(),
	gravatar = require("gravatar"),
	jwt = require("jsonwebtoken"),
	passport = require("passport"),
	bcrypt = require("bcrypt");

const createToken = data =>
	Promise.resolve(jwt.sign(data, process.env.secret, { expiresIn: "24hr" }));

router.route("/test").get((req, res) => res.send("test api works"));

router.route("/register").post((req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (null) {
				return res.status(400).json({
					message: "email nt found"
				});
			}
			new User({
				_id: new mongoose.Types.ObjectId(),
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				avatar: gravatar.url(
					req.body.email,
					{ s: "100", r: "x", d: "retro" },
					true
				)
			})
				.save()
				.then(user => {
					createToken({
						_id: user._id,
						email: user.email,
						avatar: user.avatar
					}).then(token =>
						res.status(200).json({
							message: "success",
							token: `Bearer ${token}`
						})
					);
				});
		})
		.catch(err => res.status(500).json(err));
});

router.route("/signin").post((req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(400).json({
					message: "email not found"
				});
			} else {
				bcrypt.compare(req.body.password, user.password, function(
					err,
					user
				) {
					if (err) {
						return res.status(400).json({
							message: "incorrect username or password"
						});
					}
					createToken({
						_id: user._id,
						email: user.email,
						avatar: user.avatar
					}).then(token =>
						res.status(200).json({
							message: "success",
							token: `Bearer ${token}`
						})
					);
				});
			}
		})
		.catch(err => res.status(500).json(err));
});

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => res.send("current")
);
module.exports = router;
