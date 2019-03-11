require("dotenv").config({ path: "variables.env" });
require("./models/db");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
const userRoutes = require("./routes/api/user");
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () =>
	console.log(`server is listening at port ${process.env.PORT}`)
);
