const createError = require('http-errors');
const fs = require('fs');
const Advert = require('../models/advertModel');
const User = require('../models/userModel');
const { createThumb, deleteThumb } = require('../utils/thumbFunctions');
const { getFilterObj } = require('../utils/apiFilter');

const getHomePage = async (req, res, next) => {
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

    // GET all adverts, apply filter, sort, limit fields or paginate if it exists
    const adverts = await Advert.listAdverts(
      filterObj,
      sortBy,
      fields,
      limit,
      skip
    );

    // Render home page with the obtained adverts
    res.render('index', { title: 'Nodepop', adverts });
  } catch (err) {
    next(createError(404, err));
  }
};

const getDetailAdvPage = async (req, res, next) => {
  try {
    // Obtain advert by id param
    const advert = await Advert.findById(req.params.id);

    // Render detail page with more info
    res.render('advertdetail', {
      title: res.__('Nodepop - Product Detail'),
      advert,
    });
  } catch (err) {
    next(createError(404, err));
  }
};

const getNewAdvPage = async (req, res, next) => {
  try {
    res.render('newadvert', { title: res.__('Nodepop - New Advert'), err: '' });
  } catch (err) {
    next(createError(404, err));
  }
};

const getDashboardPage = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.session.authUser._id });
    if (!user) {
      return next(createError(401, 'User not found'));
    }

    res.render('dashboard', { title: res.__('Nodepop - Dashboard'), user });
  } catch (err) {
    return next(err);
  }
};

const createNewAdv = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);

    // Make a short description if there is
    if (req.body.description) {
      req.body.tinyDescription = `${req.body.description.substring(0, 40)}...`;
    }

    // Make array tags from input text file front-end, each tag separate by comma (work,mobile,...)
    if (req.body.tags) {
      req.body.tags = req.body.tags.split(',');
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Advert.create(req.body);

    // Before response, send image path to thumbnail service
    if (req.file) {
      createThumb(req.file.filename, req.file.path);
    }

    // console.log(newAdvert);
    res.status(201).redirect('/');
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(`public/img/adverts/${req.file.filename}`);
      deleteThumb(req.file.filename);
    }
    res.render('newadvert', { title: res.__('Nodepop - New Advert'), err });
  }
};

module.exports = {
  getHomePage,
  getDetailAdvPage,
  getNewAdvPage,
  getDashboardPage,
  createNewAdv,
};
