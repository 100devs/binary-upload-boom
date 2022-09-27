module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // next middleware
      return next();
    } else {
      res.redirect('/');
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      // next middleware
      return next();
    } else {
      res.redirect('/dashboard');
    }
  },
};
