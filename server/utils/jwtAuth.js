const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = function () {
  return (req, res, next) => {
    const [bearer, tokenJWT] = (req.get('Authorization') || '').split(' ');

    // if no token then return error 401
    if (!tokenJWT) {
      return next(createError(401, 'No token provided'));
    }

    // verify the received token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      // if TokenExpiredError or JsonWebTokenError or NotBeforeError
      // return 401 error with message
      if (err) return next(createError(401, err.message));
      req.apiAuthUserId = payload.id;
      next();
    });
  };
};
