module.exports = {
  //Protecting the routes to ensure guests can only access what they are allowed to.
  ensureAuth: function (req, res, next) {
    //If the user is authenticated
    //The app.use (session({...})added our request session (by getting it from MongoDB)& app.use(passport.session())added our request.user(by getting it from our db)

    if (req.isAuthenticated()) {
      //allow the user to carry out the request
      return next();
    } else { 
      //if not redirect to the login/home page
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
