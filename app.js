const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const companyRoute = require("./routes/companyRoute");
const userRoute = require("./routes/userRoute");
const protected = require("./routes/protectedRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/api/company", companyRoute);
app.use("/api/user", userRoute);
app.use("/api/protected", protected);

// ansluta till mongodb
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to MongoDb..."))
.catch(err => console.log(err));

module.exports = app;