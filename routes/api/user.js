const router = require("express").Router();
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const User = mongoose.model("User");

router.route("/test").get((req, res) => {
	res.send("it works");
});

router
	.route("/register")
	.get((req, res) => {
		res.send("register page");
	})
	.post((req, res) => {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					return res.status(400).json({
						message: "email already exists"
					});
				}
				new User({
					email: req.body.email,
					password: req.body.password,
					avatar: gravatar.url(req.body.email, {
						s: "200",
						r: "pg",
						d: "404"
					}),
					username: req.body.username
				})
					.save()
					.then(user => res.status(200).json(user))
					.catch(err => res.status(500).json(err));
			})
			.catch(err => res.status(400).json(err));
	});
module.exports = router;
