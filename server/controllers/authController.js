// const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/userModel');

const signup = async (req, res, next) => {
  try {
    // Create new user to DB
    const newUser = await User.create(req.body);

    // if it was all correct, return
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(createError(422, err));
  }
};

module.exports = {
  signup,
};
