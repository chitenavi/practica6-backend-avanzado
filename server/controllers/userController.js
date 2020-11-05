const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const getAllUsers = async (req, res, next) => {
  try {
    if (!req.adminAuth) {
      return next(createError(401, 'Unauthorized request!'));
    }

    const users = await User.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (!req.adminAuth) {
      return next(createError(401, 'Unauthorized request!'));
    }

    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        user,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

const signup = async (req, res, next) => {
  try {
    // console.log('Admin:', req.adminAuth);
    if (req.body.rol === 'ADMIN' && !req.adminAuth) {
      // Only admin user can create another admin user
      return next(createError(401, 'Unauthorized request!'));
    }

    // Create new user to DB
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password,
      rol: req.body.rol,
    });

    const tokenJWT = signToken(newUser._id);

    // send a mail to new user

    /*
    newUser.sendMail(
      process.env.ADMIN_EMAIL,
      'Bienvenido a la API Nodepop',
      `
      <h2>Hola Amigo</h2>

      <b>Bienvenido</b>

      <p>Saludos...</p>
    `
    );
    */

    // if it was all correct, return json success data and token
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

const authenticate = async (req, res, next) => {
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
    next(createError(401, err));
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    // console.log('Admin:', req.adminAuth);
    if (!req.adminAuth) {
      // Only admin user can delete users
      return next(createError(401, 'Unauthorized request!'));
    }

    // Check if it is different id
    // (prevent erase admin himself)
    if (req.params.id === req.apiAuthUserId) {
      return next(createError(401, 'Unauthorized request!'));
    }

    // Delete user from DB
    await User.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err));
  }
};

module.exports = {
  signup,
  authenticate,
  deleteUserById,
  getAllUsers,
  getUserById,
};
