const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

/* GET login page. */
router.route('/').get(loginController.getLoginPage);

/* POST user login. */
router.route('/').post(loginController.postUserLogin);

module.exports = router;
