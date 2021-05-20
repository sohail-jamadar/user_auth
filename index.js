const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyparser = require("body-parser");
const passport = require("passport");
const userRoutes = require("./routes/user")(passport);


// requiring the passport
require('./passport')(passport);

const app = express();

// Specify your mongodb URI here
const db = "";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Database connection error");
  });

app.use(session({secret: "thesecret", saveUninitialized: false, resave: false,}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", userRoutes);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port port!`));
