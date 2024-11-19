module.exports = {
  ensureAuth: function (req, res, next) { // IF a user isnt authenticated, send them to index
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) { // If user isnt authenticated, continue. Otherwise, send them to dashboard
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
