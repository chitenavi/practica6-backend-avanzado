const express = require('express');
const adminAuth = require('../../utils/adminAuth');
const userController = require('../../controllers/userController');
const jwtAuth = require('../../utils/jwtAuth');

const router = express.Router();

router.post('/signup', jwtAuth(), adminAuth(), userController.signup);
router.post('/authenticate', userController.authenticate);

/**
 * GET users listing.
 * Private, only admins
 */
router.route('/').get(jwtAuth(), adminAuth(), userController.getAllUsers);

/**
 * GET user (:id)
 * DELETE delete user (:id)
 * Private, only admins
 */
router
  .route('/:id')
  .get(jwtAuth(), adminAuth(), userController.getUserById)
  .delete(jwtAuth(), adminAuth(), userController.deleteUserById);

module.exports = router;
