const express = require('express');

const router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', (req, res, next) => {
  // Get locale param
  const { locale } = req.params;

  // save page from user comming
  const returnTo = req.get('referer');

  // new response cookie with locale
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // redirect to same page
  res.redirect(returnTo);
});

module.exports = router;
