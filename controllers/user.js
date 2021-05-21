const User = require("../models/User");

//@desc Registration Page
//@route GET /api/v1/register/
//@access Public
exports.getRegister = (req, res, next) => {
  res.status(200).json({ success: true, data: "Registeration Page.." });
};

//@desc Register new user
//@route POST /api/v1/register/
//@access Public
exports.postRegister = (req, res, next) => {
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
      res.status(400).json({ success: false, msg: "Some issues encountered" });
    });
};

//@desc Login page
//@route GET /api/v1/login/
//@access Public
exports.getLogin = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Welcome to Login page" });
};

//@desc Fetch profile of the logged-in user
//@route GET /api/v1/profile/
//@access Private
exports.getProfile = (req, res, next) => {
  res.status(200).json({ success: true, data: req.session });
};

//@desc Logout currently logged user
//@route GET /api/v1/logout/
//@access Public
exports.getLogout = (req, res, next) => {
  req.logout();
  res.status(200).json({ success: true, data: "User logged out..!" });
};
