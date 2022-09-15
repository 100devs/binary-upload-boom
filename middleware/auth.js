module.exports = {
  ensureAuth: function (req, res, next) { //next passes along to next piece of middleware in the sequence/route
    console.log(req.user)
    console.log(req.session)
    
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
