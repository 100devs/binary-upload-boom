
//using ensureAuth to protect our routes from users that are not logged in
module.exports = {
  ensureAuth: function (req, res, next) {
    //check if the user is signed in
    if (req.isAuthenticated()) {
    //call the next method in the sequence for whichever route
    console.log(req.user)
    console.log(req.session)
      return next();
    } else {
      //redirects user back to main page
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
