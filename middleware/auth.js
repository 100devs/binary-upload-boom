module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) { //checking to see if the user is authenticated. If they are, pass it to the next part of the path (e.g., next() ).
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) { //protecting the routes to make sure a guest can't go somewhere they aren't allowed
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
