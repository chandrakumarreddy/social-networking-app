const mongoose = require("mongoose");

mongoose
	.connect(process.env.mongoURI)
	.then(() => console.log("connected"))
	.catch(err => console.log(err));
require("./user");
