const createError = require('http-errors');
const User = require('../models/userModel');

// Middleware for check admin user
module.exports = function () {
  return async (req, res, next) => {
    // Find user in DB
    const user = await User.findById(req.apiAuthUserId);

    if (!user) return next(createError(404, 'Not found'));

    if (user.rol !== 'ADMIN') {
      return next(createError(401, 'Unauthorized request!'));
    }

    next();
  };
};
