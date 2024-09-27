// If user is authenticated, do the next task which is go to the controller and do task 
// If not go back to home screen 
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },

  // If user is authenticated, do the next task which is go to the controller and do task 
// If not, the guest can go back to the dashboard  
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
