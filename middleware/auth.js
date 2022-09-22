module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) { // is this person authenticated, if they are, return next
      return next(); // pass to next piece of middleware in that sequence, continue in the process that  it is traveling along - ie won't go from ensureAuth to ensureGuest
    } else {
      res.redirect("/"); // else send back to homepage 
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
