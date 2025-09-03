// Export functions for the app 
module.exports = {
  // Middleware to ensure the user is Authenticated.
  ensureAuth: function (req, res, next) {
    // passport to add isAuthenticated() to req object
    // protect the pages that require login
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  // Middleware to ensure the user is not Authenticated(guest)
  ensureGuest: function (req, res, next) {
    // if user is not authenticated/guest, allow access
    // protect the pages that only visible to guests
      if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
