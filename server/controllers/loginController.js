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
      // load values from request body
      const { email } = req.body;
      const { password } = req.body;

      // find user in DB
      const user = await User.findOne({ email }).select('+password');

      // if no user or pass is diferent redirect to login
      // and show the errors

      if (!user || !(await user.comparePasswords(password, user.password))) {
        res.locals.error = res.__('Invalid credentials');
        res.locals.email = email;
        res.render('login', { title: 'Nodepop - Login' });
        return;
      }

      // apuntar el _id del usuario en su sessión
      req.session.authUser = {
        _id: user._id,
        rol: user.rol,
      };

      // redirect to user dashboard
      res.redirect('/dashboard');
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /logout
   */
  getLogout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      // regenerate new session

      // redirect to home
      res.redirect('/');
    });
  }
}

module.exports = new LoginController();
