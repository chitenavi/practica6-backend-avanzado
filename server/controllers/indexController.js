const createError = require('http-errors');
const Advert = require('../models/advertModel');

const getHomePage = async (req, res, next) => {
  try {
    // GET all adverts, apply the received query string if it exists
    const adverts = await Advert.listAdverts(Advert.find(), req.query);

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
    res.render('advertdetail', { title: advert.name, advert });
  } catch (err) {
    next(createError(404, err));
  }
};

const getNewAdvPage = async (req, res, next) => {
  try {
    res.render('newadvert', { title: 'Nuevo Anuncio' });
  } catch (err) {
    next(createError(404, err));
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

    // console.log(newAdvert);
    res.status(201).redirect('/');
  } catch (err) {
    next(createError(422, err));
  }
};

module.exports = {
  getHomePage,
  getDetailAdvPage,
  getNewAdvPage,
  createNewAdv,
};
