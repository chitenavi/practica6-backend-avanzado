require('dotenv').config();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

// crear un transport
const transport = nodemailer.createTransport(mg(mailgunAuth));

module.exports = transport;
