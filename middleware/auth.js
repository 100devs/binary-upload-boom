module.exports = {
  ensureAuth: function (req, res, next) {
    console.log(req.user) // matches user id to session
    console.log(req.session) // matches session to user id
    if (req.isAuthenticated()) {
      return next();
    } else {
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
