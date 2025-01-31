// THE ENSUREAUTH FUNCTION WILL AUTH THE REQUEST AND AALLOW YOU TO GO NEXT ELSE IF NOT AUTH RESUDIRECT TO MAIN ROUTE. If the user is not authenticated , ET THEM GO ON TO THE NEXT ROUTE. IF THEY ARE AUTHENTICAATED, REDIRECT THEM TO THE DASHBOARD

module.exports = {
  ensureAuth: function (req, res, next) {
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
