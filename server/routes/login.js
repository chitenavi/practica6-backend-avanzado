const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

/* GET login page. */
/* POST user login. */
router
  .route('/')
  .get(loginController.getLoginPage)
  .post(loginController.postUserLogin);

module.exports = router;
