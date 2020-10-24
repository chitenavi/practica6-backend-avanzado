// Config enviroment variables with .env file using dotenv,
// must be at root project directory
require('dotenv').config();
const mongoose = require('mongoose');

// Remote Database, use Atlas
/* const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
); */

// Local database
const DB = process.env.DATABASE_LOCAL;

mongoose.connection.on('open', () => {
  console.log(
    `Connected to MongoDB in ${mongoose.connection.name} successful!`
  );
});

mongoose.connection.on('error', err => {
  console.log(`Connection error!: ${err}`);
  process.exit(1);
});

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
