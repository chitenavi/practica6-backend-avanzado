// TODO: 1. Implementar autenticación al API con JWT
// TODO: 2. Internacionalización. Frontend en ingés y español
// TODO: 3. Api endpoint crear anuncion con imagen. Thumbnail 100x100px microservicio
// TODO: 4. Testing del API con supertest
// TODO: 5. Crear un módulo npm público con una utilidad práctica

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

// i18n module, middleware for internationalize website
const i18n = require('./utils/i18nSetup');

app.use(i18n.init);

// Middleware for catch request date
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Init session system (load on req.session) and persist in DB
app.use(sessionSetup(mongoConnection));

// Make session object for use in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Website routes
 */
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));

/**
 * API routes
 */
app.use('/api/v1/adverts', require('./routes/api/advertRoutes')); // adverts
app.use('/api/v1/users', require('./routes/api/users'));

// if any request url no exits, then catch 404 and forward to error handler
app.all('*', (req, res, next) => {
  next(createError(404, `Not Found ${req.originalUrl} on this server!!`));
});

// Global error handler
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
