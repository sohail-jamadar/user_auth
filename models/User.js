const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username"],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
  },
});

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = (password,hash) => {
    return bcrypt.compareSync(password,hash);
};

module.exports = mongoose.model("User", userSchema);