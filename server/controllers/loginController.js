const bcrypt = require('bcrypt');
const User = require('../models/userModel');

class LoginController {
  /**
   * GET /login
   */
  getLoginPage(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login', { title: 'Nodepop - Login' });
  }

  /**
   * POST /login
   */
  async postUserLogin(req, res, next) {
    try {
      // recoger valores de entrada
      const { email } = req.body;
      const { password } = req.body;

      // buscar el usuario en la BD
      const user = await User.findOne({ email: email });

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.locals.error = 'Invalid credentials';
        res.locals.email = email;
        res.render('login', { title: 'Nodepop - Login' });
        return;
      }

      // si el usuario existe y la password es correcta

      // apuntar el _id del usuario en su sessión
      /*
      req.session.authUser = {
        _id: user._id,
        // rol: ...
      };*/

      // enviar email
      // expresamente no ponemos await para no esperar a que se mande el email antes de redirigir
      // usuario.sendMail(process.env.ADMIN_EMAIL, 'Bienvenido a NodeApi', `Hola <%= nombre %>`);

      /*
      await usuario.enqueueNewEmail(
        process.env.ADMIN_EMAIL,
        'Bienvenido a NodeApi',
        `Hola <%= nombre %>`
      );
      */

      // redirigir a zona privada
      console.log('User logged successfully!');
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LoginController();
