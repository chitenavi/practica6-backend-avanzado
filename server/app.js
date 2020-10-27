const createError = require('http-errors');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sessionSetup = require('./utils/sessionSetup');

const app = express();

// Connection to DB
const mongoConnection = require('./utils/connectMoonDB');

// view engine setup, ejs to html file extension
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for catch request date
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// const sessionAuth = require('./utils/sessionAuth');

app.use(sessionSetup(mongoConnection));

// hacer disponible el objeto de sesión en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Website routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));

/**
 * API routes
 */
app.use('/api/v1/adverts', require('./routes/api/advertRoutes')); // adverts

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, `Not Found ${req.originalUrl} on this server!!`));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Errors comming from express-validator module
  /*
  if (err.array) {
    // si err tiene un array, entonces error de validacion
    err.status = 422;
    const errInfo = err.array();
    errInfo.forEach(ele => {
      err.message += `\n- ${ele.param}: ${ele.msg}`;
    });
  }*/

  // Api request, response json format
  if (req.originalUrl.startsWith('/api/v1/')) {
    res.status(err.status).json({
      status: 'fail',
      code: err.status,
      message: err.message,
    });
    return;
  }

  // render the error page, browsers
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
