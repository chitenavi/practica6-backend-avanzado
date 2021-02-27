/**
 * API routes
 */

const express = require('express');
// const adminAuth = require('../../utils/adminAuth');

// const { advertValidationRules, validate } = require('../../utils/validators');
const uploadAdvImg = require('../../controllers/uploadController');

// import functions from controller
const {
  getAllAdverts,
  getAllExistTags,
  createAdvert,
  getAdvertById,
  updateAdvertById,
  deleteAdvertById,
} = require('../../controllers/advertController');

const router = express.Router();

/* GET /api/v1/adverts */
/* POST /api/v1/adverts */
router.route('/').get(getAllAdverts).post(uploadAdvImg, createAdvert);

/* GET /api/v1/adverts/tags */
router.route('/tags').get(getAllExistTags);

/* GET /api/v1/adverts/id */
/* PUT /api/v1/adverts/id */
/* DELETE /api/v1/adverts/id */
router
  .route('/:id')
  .get(getAdvertById)
  .put(uploadAdvImg, updateAdvertById)
  .delete(deleteAdvertById);

module.exports = router;
