const express = require('express');

const router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', (req, res, next) => {
  // Recuperar el locale que nos pasan
  const { locale } = req.params;

  // guardar la página de donde precede el usuario
  const volverA = req.get('referer');

  // establecer la cookie en la respuesta con el nuevo locale
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // redirigir al usuario a donde venía
  res.redirect(volverA);
});

module.exports = router;
