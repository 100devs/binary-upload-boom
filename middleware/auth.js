//auth.js module contains ensureAuth and ensureGuest functions to protect routes from unauthorized access and to redirect users to the login page if they are not logged in.

module.exports = {
  ensureAuth: function (req, res, next) { //ensureAuth is for protecting routes from unauthorized access
    if (req.isAuthenticated()) { //isAuthenticated() is a passport function that checks if the user is logged in or not and returns true or false accordingly
      return next(); //if the user is logged in, the next() function is called to move to the next middleware function in the route handler
    } else { //if the user is not logged in, the user is redirected to the login page
      res.redirect("/"); //redirects to the login page
    }
  },
  ensureGuest: function (req, res, next) { //ensureGuest is for redirecting users to the dashboard page if they are not logged in
    if (!req.isAuthenticated()) { //if the user is not logged in, the next() function is called to move to the next middleware function in the route handler
      return next(); //the next middleware function is called, in this case it is the getLogin function in the auth.js controller
    } else { //if the user is logged in, the user is redirected to the dashboard page
      res.redirect("/dashboard"); //redirects to the dashboard page
    }
  },
};
