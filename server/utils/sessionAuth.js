// modulo que exporta una función
// que crea un middleware y lo devuelve

module.exports = function (options) {
  return function (req, res, next) {
    // si el usuario no esta autenticado le mandamos al login
    if (!req.session.authUser) {
      res.redirect('/login');
      return;
    }

    // comprobar roles
    // buscar el usuario en la BD
    // comprobar que tiene la menos los roles de options.roles

    next();
  };
};
