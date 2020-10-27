const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

/**
 * GET users listing.
 * POST create user.
 */
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

/**
 * GET user (:id)
 * PATCH update user (:id)
 * DELETE delete user (:id)
 */
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
