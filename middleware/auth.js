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


/*
The code you've provided exports an object with two middleware functions: ensureAuth and ensureGuest. These middleware functions are often used for route protection and access control in an Express.js application, particularly in the context of user authentication. Let's break down what each of these middleware functions does:

    ensureAuth:

        This middleware function is used to ensure that a user is authenticated before allowing access to a particular route or resource. It is typically used to protect routes that should only be accessible to authenticated users.

        Inside the function, it checks if the user is authenticated by calling req.isAuthenticated(). If the user is authenticated (i.e., logged in), it calls next() to allow the request to continue processing, granting access to the protected route.

        If the user is not authenticated (i.e., not logged in), it redirects the user to the root path ("/"). This is often done to redirect unauthenticated users to a login page or some other appropriate location.

    ensureGuest:

        This middleware function is used to ensure that a user is not authenticated (i.e., is a guest) before allowing access to a particular route or resource. It is typically used to protect routes that should only be accessible to unauthenticated users.

        Inside the function, it checks if the user is not authenticated by negating the result of req.isAuthenticated(). If the user is not authenticated (i.e., is a guest), it calls next() to allow the request to continue processing, granting access to the protected route.

        If the user is authenticated (i.e., logged in), it redirects the user to the "/dashboard" path or some other appropriate location. This is often done to redirect authenticated users away from routes that should only be accessible to guests.

        n the above code, ensureAuth is used to protect the "/profile" route, ensuring that only authenticated users can access it, while ensureGuest is used to protect the "/login" route, ensuring that only unauthenticated guests can access it.
*/