module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.user)
      // console.log('auth middleware req', req)
      return next();
    } else {
      console.log('auth middleware req', req.user)
      console.log('is auth', req.isAuthenticated())

      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
