const fs = require('fs');
const createError = require('http-errors');
const { createThumb, deleteThumb } = require('../utils/thumbFunctions');
const Advert = require('../models/advertModel');
const { getFilterObj } = require('../utils/apiFilter');

/**
 * Generate API Documentation with apidoc
 */

/**
 * @api {get} /api/v1/adverts 1.List all adverts (requires auth token)
 * @apiName GetAllAdverts
 * @apiGroup Adverts
 *
 * @apiDescription Get all the ads, and you can filter according to the arguments described
 *
 * @apiParam {String} token Token jwt authorization
 *
 * @apiExample Example usage:
 * curl -i http://localhost/api/v1/adverts
 *
 * @apiExample Filter usage:
 * By name:
 * curl -i http://localhost/api/v1/adverts?name=ipho
 * By price:
 * curl -i http://localhost/api/v1/adverts?price=100-500
 * By sale (on sale:true or to buy:false):
 * curl -i http://localhost/api/v1/adverts?sale=false
 * By tag:
 * curl -i http://localhost/api/v1/adverts?tags=work,mobile
 * Sort by price:
 * curl -i http://localhost/api/v1/adverts?sort=price
 * Limit obtained fields:
 * curl -i http://localhost/api/v1/adverts?fields=name,price
 * Paginate:
 * curl -i http://localhost/api/v1/adverts?start=1&limit=4
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Number} results Number of adverts
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object[]} data.adverts Adverts's list
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *      "adverts": [
 *           {
 *               "sale": true,
 *               "tags": [
 *                   "lifestyle",
 *                   "motor"
 *               ],
 *               "_id": "5f59fc8f53bab60f7d995367",
 *               "name": "Bicicleta",
 *               "price": 230.15,
 *               "tinyDescription": "Ut enim ad minim veniam, quis nostrud exercitation ullamco...",
 *               "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
 *               "image": "bici.jpg"
 *           }, ...
 *         ]
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not Found"
 *    }
 */
const getAllAdverts = async (req, res, next) => {
  try {
    // ** FILTER
    // Obtain filter object from query string
    const filterObj = getFilterObj(req.query);

    // ** SORT
    // Order by one or more keys separated by commas
    // if no sort, then we apply sort by create date by default
    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : 'createdAt';

    // ** FIELDS
    // return only the desired fields
    // by default, return everything except __v field, use by moongose
    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    // ** PAGINATE
    // Return 20 adverts by default
    const start = req.query.start * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (start - 1) * limit;

    // Get adverts, apply filter, sort, limit fields or paginate if it exists
    const adverts = await Advert.listAdverts(
      filterObj,
      sortBy,
      fields,
      limit,
      skip
    );

    // console.log(adverts);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: adverts.length,
      data: {
        adverts: adverts,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

/**
 * @api {get} /api/v1/adverts/:id 2.Find an advert (requires auth token)
 * @apiName GetAdvert
 * @apiGroup Adverts
 *
 * @apiDescription Get one advert by id param
 *
 * @apiExample Example usage:
 * curl -i http://localhost/api/v1/adverts/5f59fc8f53bab60f7d995367
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {id} id Advert id
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *          "advert": {
 *              "sale": true,
 *              "tags": [
 *                  "lifestyle",
 *                  "motor"
 *                ],
 *              "_id": "5f59fc8f53bab60f7d995367",
 *              "name": "Bicicleta",
 *              "price": 230.15,
 *              "tinyDescription": "Ut enim ad minim veniam, quis nostrud exercitation ullamco...",
 *              "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
 *              "image": "bici.jpg",
 *              "__v": 0
 *          }
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Cast to ObjectId failed for value \"5f5s9fc8f53bab60f7d995367\" at path \"_id\" for model \"Advert\""
 *    }
 */

const getAdvertById = async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);

    if (advert.image) {
      advert.image = `/img/adverts/${advert.image}`;
    }

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: advert,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

/**
 * @api {post} /api/v1/adverts/ 3.Create an advert (requires auth token)
 * @apiName PostAdvert
 * @apiGroup Adverts
 * @apiDescription Create one advert, content in the body (form-data)
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {file} image Advert file image (jpg/png)
 * @apiParam {String} name Advert name
 * @apiParam {Number} price Advert price
 * @apiParam {String} description Advert description
 * @apiParam {Boolean} sale Advert type (to sale:true, to buy: false)
 * @apiParam {String[]} tags Advert tags (work, mobile, lifestyle, motor)
 * @apiParamExample {json} Input
 *    {
 *      "image": "telefono.jpg",
 *      "name": "Telefono movil",
 *      "price": 234,
 *      "description": "ddfkedkfekfekfkekfekkek",
 *      "sale": "false",
 *      "tags": "mobile"
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data created
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *          "advert": {
 *              "sale": true,
 *              "tags": [
 *                  "lifestyle",
 *                  "motor"
 *                ],
 *              "createdAt": "2020-09-10T12:39:49.460Z",
 *              "_id": "5f5a1e9e30f0ba17c4110cbe",
 *              "name": "Telefono movil",
 *              "price": 234,
 *              "description": "ddfkedkfekfekfkekfekkek",
 *              "tinyDescription": "ddfkedkfekfekfkekfekkek...",
 *              "image": "image_1599741598878_20200812_115221.jpg",
 *              "__v": 0
 *          }
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "\n- name: Product must have a name"
 *    }
 */

const createAdvert = async (req, res, next) => {
  try {
    // console.log(req.file);
    // console.log(req.body);

    if (req.body.description) {
      req.body.tinyDescription = `${req.body.description.substring(0, 40)}...`;
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }

    //console.log(req.body);

    const newAdvert = await Advert.create(req.body);

    // Before response, send image path to thumbnail service
    if (req.file) {
      createThumb(req.file.filename, req.file.path);
    }

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: newAdvert,
      },
    });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(`public/img/adverts/${req.file.filename}`);
      deleteThumb(req.file.filename);
    }
    next(createError(422, err));
  }
};

/**
 * @api {put} /api/v1/adverts/:id 4.Update an advert (requires auth token)
 * @apiName PutAdvert
 * @apiGroup Adverts
 *
 * @apiDescription Update one advert by id param
 *
 * @apiParam {String} token Token jwt authorization
 * @apiParam {id} id Advert id
 * @apiParam {String} name Advert name
 * @apiParam {Number} price Advert price
 * @apiParamExample {json} Input
 *    {
 *      "name": "Telefono movil actualizado",
 *      "price": 154,
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data updated
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *          "advert": {
 *              "sale": true,
 *              "tags": [
 *                  "lifestyle",
 *                  "motor"
 *                ],
 *              "createdAt": "2020-09-10T12:39:49.460Z",
 *              "_id": "5f5a1e9e30f0ba17c4110cbe",
 *              "name": "Telefono movil actualizado",
 *              "price": 154,
 *              "description": "ddfkedkfekfekfkekfekkek",
 *              "tinyDescription": "ddfkedkfekfekfkekfekkek...",
 *              "image": "image_1599741598878_20200812_115221.jpg",
 *              "__v": 0
 *          }
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Validation failed: price: An advert must have a price"
 *    }
 */

const updateAdvertById = async (req, res, next) => {
  try {
    // If there is a new image, delete the previous one
    if (req.file) {
      const adv = await Advert.findById(req.params.id);
      fs.unlinkSync(`public/img/adverts/${adv.image}`);

      // Send previous image name to thumbnail service for delete
      deleteThumb(adv.image);

      // Send new image name to thumbnail service for create
      createThumb(req.file.filename, req.file.path);

      // Update parameter with image name
      req.body.image = req.file.filename;
    }

    // Update the advert
    const advertUpd = await Advert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: advertUpd,
      },
    });
  } catch (err) {
    if (req.file) {
      deleteThumb(req.file.filename);
      fs.unlinkSync(`public/img/adverts/${req.file.filename}`);
    }
    next(createError(422, err));
  }
};

/**
 * @api {delete} /api/v1/adverts/:id 5.Delete an advert (requires auth token)
 * @apiName DeleteAdvert
 * @apiGroup Adverts
 *
 * @apiParam {String} token Token jwt authorization
 * @apiDescription Delete one advert by id param
 *
 * @apiParam {id} id Advert id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Cast to ObjectId failed for value \"5f5a1e9e30fd0ba17c4110cbe\" at path \"_id\" for model \"Advert\""
 *    }
 */

const deleteAdvertById = async (req, res, next) => {
  try {
    // First, check if there is an image and delete it
    const advert = await Advert.findById(req.params.id);

    if (advert) {
      fs.unlinkSync(`public/img/adverts/${advert.image}`);

      // Send image name to deleting thumbnail service
      deleteThumb(advert.image);
    }

    // Second, delete advert from DB
    await Advert.findByIdAndRemove(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err));
  }
};

/**
 * @api {get} /api/v1/adverts/tags/ 6.Find all exist tags (requires auth token)
 * @apiName GetAllTags
 * @apiGroup Adverts
 *
 * @apiDescription Get all exist tags in th DB
 *
 * @apiExample Example usage:
 * curl -i http://localhost/api/v1/adverts/tags
 *
 * @apiParam {String} token Token jwt authorization
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String[]} data.tags Adverts tags list in DB
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "data": {
 *      "tags": [
 *           "lifestyle",
 *           "mobile",
 *           "motor",
 *           "work"
 *        ]
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not Found"
 *    }
 */

const getAllExistTags = async (req, res, next) => {
  try {
    const existTags = await Advert.distinct('tags');

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tags: existTags,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

module.exports = {
  getAllAdverts,
  getAllExistTags,
  createAdvert,
  getAdvertById,
  updateAdvertById,
  deleteAdvertById,
};
