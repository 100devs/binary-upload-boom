module.exports = { // Export functions
  ensureAuth: function (req, res, next) { // Ensure user is authenticated
    if (req.isAuthenticated()) { // If user is authenticated
      return next(); // Continue
    } else { // If user is not authenticated
      res.redirect("/"); // Redirect to index page
    }
  },
  ensureGuest: function (req, res, next) { // Ensure user is not authenticated
    if (!req.isAuthenticated()) { // If user is not authenticated
      return next(); // Continue
    } else { // If user is authenticated
      res.redirect("/dashboard"); // Redirect to dashboard page
    }
  },
};
