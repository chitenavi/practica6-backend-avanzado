const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = function (mongoConnection) {
  return session({
    name: 'nodepop-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    },
    store: new MongoStore({
      mongooseConnection: mongoConnection,
    }),
  });
};
