// const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  try {
    // Create new user to DB
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password,
    });

    const tokenJWT = signToken(newUser._id);

    // if it was all correct, return json success data
    res.status(201).json({
      status: 'success',
      token: tokenJWT,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};

const login = async (req, res, next) => {
  try {
    // get parameters from body
    const { email, password } = req.body;

    // if no email or pass in the body generate error
    if (!email || !password) {
      return next(createError(400, 'Please provide email and password!'));
    }

    const user = await User.findOne({ email }).select('+password');

    // if no user or pass is diferent redirect to login
    // and show the errors
    if (!user || !(await user.comparePasswords(password, user.password))) {
      // respond to API client with json error
      return next(createError(401, 'Invalid credentials'));
    }

    //console.log(user);
    // make a JWT
    const tokenJWT = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token: tokenJWT,
    });
  } catch (err) {
    next(createError(422, err));
  }
};

module.exports = {
  signup,
  login,
};
