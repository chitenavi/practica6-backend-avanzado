const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @api {get} /api/v1/users 2.List all users (requires auth token)
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiDescription Get all the users in DB. Only admins. Require Auth token
 *
 * @apiParam {String} token Token jwt authorization
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Number} results Number of users
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object[]} data.users Users's list
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 2,
 *      "data": {
 *      "users": [
 *           {
 *               "rol": "USER",
 *               "avatar": "avatar-default.png",
 *               "_id": "5fa70b5aac33091e4b51d809",
 *               "username": "devnodepopuser",
 *               "email": "user@example.com",
 *               "__v": 0,
 *               "createdAt": "2020-11-07T21:02:18.809Z",
 *               "updatedAt": "2020-11-07T21:02:18.809Z"
 *           }, ...
 *         ]
 *      }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "No token provided"
 *    }
 */

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

/**
 * @api {get} /api/v1/users/:id 3.Get a user data (requires auth token)
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiDescription Get one user by id param. Only admins. Require auth
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {id} id User id
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.user User data
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *          "user": {
 *           "rol": "USER",
 *           "avatar": "avatar-default.png",
 *           "_id": "5fa70b5aac33091e4b51d809",
 *           "username": "devnodepopuser",
 *           "email": "user@example.com",
 *           "__v": 0,
 *           "createdAt": "2020-11-07T21:02:18.809Z",
 +           "updatedAt": "2020-11-07T21:02:18.809Z"
 +          }
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "No token provided"
 *    }
 */

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

/**
 * @api {post} /api/v1/users/ 4.Create a new user (requires auth token)
 * @apiName Signup
 * @apiGroup Users
 *
 * @apiDescription Create a new user in DB. Only admins can create admin users. Require Auth token
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {String} username User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} avatar User avatar. Default user-avatar
 * @apiParam {String} rol User rol. ADMIN or USER. Default USER
 *
 * @apiParamExample {json} Input
 *    {
 *      "username": "paco",
 *      "email": "prueba@hola.com",
 *      "password": 1234
 *    }
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {String} token Token jwt
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object[]} data.user New user created
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 201 OK
 *    {
 *      "status": "success",
 *      "token": "eyJhbGciOiJzI1NsInR5cCI6IkpXVCJ9.eyJpZCIVmYTcwYjVhYWMzMzA5MWU0YjUxIjo4xWN7tJgLrvNha58f6Y7UJKL7_HFkkGpY"
 *      "data": {
 *         "user": { ... }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "User validation failed: username: Please add a username"
 *    }
 */

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

    // send a mail to new registered user

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

/**
 * @api {post} /api/v1/users/authenticate 1.Authenticate user API
 * @apiName Authenticate
 * @apiGroup Users
 *
 * @apiDescription Authenticate user in API. Content in body, return token JWT
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {String} token Token jwt
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "token": "eyJhbGciOiJzI1NsInR5cCI6IkpXVCJ9.eyJpZCIVmYTcwYjVhYWMzMzA5MWU0YjUxIjo4xWN7tJgLrvNha58f6Y7UJKL7_HFkkGpY"
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "User not registered!!"
 *    }
 */

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
    if (!user) {
      // respond to API client with json error
      return next(createError(401, 'User not registered!!'));
    }
    if (!(await user.comparePasswords(password, user.password))) {
      return next(createError(401, 'Invalid password!!'));
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

/**
 * @api {delete} /api/v1/users/:id 5.Delete user API (requires auth token)
 * @apiName DeleteUserById
 * @apiGroup Users
 *
 * @apiDescription Delete user by ID. Only Admins. Require Auth token
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {String} id User id
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Error: Invalid id
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Cast to ObjectId failed for value \"5fa73747d7d93d9be3e5f3\" at path \"_id\" for model \"User\""
 *    }
 * @apiErrorExample {json} Error: No token
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "No token provided"
 *    }
 */

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
