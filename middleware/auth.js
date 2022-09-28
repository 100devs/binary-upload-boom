module.exports = {
  ensureAuth: function (req, res, next) { //makes sure that you're auth otherwise it will send you to root route
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {   //if you're authenticated it will let you go to the dashboard, otherwise, it will run the next() function
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
