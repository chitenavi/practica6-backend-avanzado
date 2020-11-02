const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please add a valid email'],
    },
    avatar: String,
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 4,
    },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = function (plainTextPass) {
  return bcrypt.hash(plainTextPass, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
