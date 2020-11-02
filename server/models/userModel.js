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
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 4,
      select: false,
    },
    avatar: String,
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (plainTextPass) {
  return await bcrypt.hash(plainTextPass, 10);
};

userSchema.methods.comparePasswords = async function (
  tryPassword,
  userPassword
) {
  return await bcrypt.compare(tryPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
