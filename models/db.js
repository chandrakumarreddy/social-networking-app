const mongoose = require("mongoose");

mongoose
	.connect(process.env.mongoURI)
	.then(() => console.log("connected successfully"))
	.catch(err => console.log(err));
require("./user");
