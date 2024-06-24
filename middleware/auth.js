
module.exports = {
  // function checks to see if user is authenticated
  ensureAuth: function (req, res, next) {
    // console.log(req.user) // displays user object model
    // console.log(req.session) // displays session object model
    // if user is authenticated
    if (req.isAuthenticated()) {
      // proceed to the next step
      return next();
      // if user is not authenticated, force them to go back to the home route
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
