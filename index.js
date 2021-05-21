const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyparser = require("body-parser");
const passport = require("passport");
const dotenv = require('dotenv');
const path = require('path');

const db = require('./config/db');
const userRoutes = require("./routes/user")(passport);

dotenv.config({path: path.join(__dirname, '/config','config.env')});

// requiring the passport
require('./passport')(passport);

const app = express();

// Establishing Connection With the Database
db();

app.use(session({secret: "thesecret", saveUninitialized: false, resave: false,}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
