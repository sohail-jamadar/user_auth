const express = require("express");
const router = express.Router();
const User = require("../models/User");

const isLoggedin = (req,res,next) =>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/api/v1/login');
    }
};

module.exports = (passport) => {
  router.post("/register", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username })
      .then((doc) => {
        if (doc) {
          res.status(500).json({ success: false, msg: "User already exisits" });
        } else {
          const newUser = new User();
          newUser.username = username;
          newUser.password = newUser.hashPassword(password);
          newUser
            .save()
            .then((doc) => {
              res.status(201).send(doc);
            })
            .catch((err) => {
              res.status(400).json({ success: false, msg: "Database error" });
            });
        }
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Some issues encountered" });
      });
  });

  router.get('/login', (req,res,next)=>{
      res.status(200).json({success:true, msg:"Welcome to Login page"});
  });

  router.post(
    "/login",
    passport.authenticate(
      "local",
      {
        failureRedirect: "/api/v1/login",
        successRedirect: "/api/v1/profile",
      }));

    router.get('/profile', isLoggedin , (req,res,next)=>{
        res.status(200).json({success:true, data: req.session});
    });

    router.get('/logout', (req,res,next)=>{
        req.logout();
        res.status(200).json({success:true, data:"User logged out..!"});
    })

  return router;
};
