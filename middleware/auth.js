// create auth rules and export for use elsewhere in the application

module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // if auth'd, continue
      return next();
    } else {
      // if a user is not auth'd, send them to the index route (where login and signup buttons are)
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      // if guest, continue
      return next();
    } else {
      // if not a guest, redirect to dashboard
      res.redirect("/dashboard");
    }
  },
};
