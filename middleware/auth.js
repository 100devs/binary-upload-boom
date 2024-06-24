module.exports = {
  ensureAuth: function (req, res, next) {
    console.log(req.user) //just logging to see what's happening
    console.log(req.session) //just logging to see what's happening
    if (req.isAuthenticated()) {
      return next();//if authenticated, do the next thing in the sequence where ensureGuest was called, which was in routes/main.js, from this request: router.get("/profile", ensureAuth, postsController.getProfile), so the next thing would be postsController.getProfile; ensuring auth is protecting routes to make sure people can't get to routes where they aren't authorized.
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) { //this one makes sure logged in people dont go back to pages that they don't need to see, like login page; used in traversy's story books if we want to see it
    if (!req.isAuthenticated()) {
      return next(); 
    } else {
      res.redirect("/dashboard");
    }
  },
};
