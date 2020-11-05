const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = function () {
  return (req, res, next) => {
    // check if we receive a header parameter Authorization
    // with a valid JWT // get the token from header, body or query string
    const tokenJWT =
      req.get('Authorization') || req.query.token || req.body.token;

    // if no token then return error 401
    if (!tokenJWT) {
      return next(createError(401, 'No token provided'));
    }

    // verify the received token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      // if TokenExpiredError or JsonWebTokenError or NotBeforeError
      if (err) return next(createError(401, err.message));
      req.apiAuthUserId = payload.id;
      next();
    });
  };
};
