module.exports = {
  //checks if user is logged in
  ensureAuth: function (req, res, next) {
    // if logged in continue
    if (req.isAuthenticated()) {
      return next();
    // else redirect to index
    } else {
      res.redirect("/");
    }
  },
  //checks if user is logged in
  ensureGuest: function (req, res, next) {
    //if not logged in continue
    if (!req.isAuthenticated()) {
      return next();
    // else redirect to feed
    } else {
      res.redirect("/feed");
    }
  },
};
