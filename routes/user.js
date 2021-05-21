const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/user");

const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/api/v1/login");
  }
};

module.exports = (passport) => {
  router.get("/register", userController.getRegister);

  router.post("/register", userController.postRegister);

  router.get("/login", userController.getLogin);

  router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/api/v1/login",
      successRedirect: "/api/v1/profile",
    })
  );

  router.get("/profile", isLoggedin, userController.getProfile);

  router.get("/logout", userController.getLogout);

  return router;
};
