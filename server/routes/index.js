const express = require('express');

const { advertValidationRules, validate } = require('../utils/validators');

const uploadAdvImg = require('../controllers/uploadController');

const {
  getHomePage,
  getDetailAdvPage,
  getNewAdvPage,
  createNewAdv,
} = require('../controllers/indexController');

const loginController = require('../controllers/loginController');

const sessionAuth = require('../utils/sessionAuth');

const router = express.Router();

/* GET home page. */
router.route('/').get(getHomePage);

/* GET detail product page. */
router.route('/adverts/:id').get(getDetailAdvPage);

/* GET new product page. */
/* POST create new product, redirect to home. */
router
  .route('/newadv')
  .get(sessionAuth(), getNewAdvPage)
  .post(
    sessionAuth(),
    uploadAdvImg,
    advertValidationRules(),
    validate,
    createNewAdv
  );

/* GET user logout */
router.route('/logout').get(loginController.getLogout);

module.exports = router;
