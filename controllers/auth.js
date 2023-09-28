const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
/*
In the code you've provided, you are importing several Node.js modules and a user model. Let's break down what each line does:

    const passport = require("passport");:
        This line imports the passport module, which is a popular authentication middleware for Node.js applications. Passport is commonly used for implementing user authentication and authorization in web applications.

    const validator = require("validator");:
        This line imports the validator module, which is a library for data validation. It provides various functions to validate data such as email addresses, URLs, and more. In web applications, data validation is crucial for ensuring the integrity and security of user-submitted data.

    const User = require("../models/User");:

        This line imports a User model from a file located in the "../models/User" directory. A "model" in the context of web applications often represents a data structure, typically associated with a database table or collection, that defines the shape of the data and provides methods for interacting with it.

        The User model likely represents user data, such as user profiles, usernames, passwords, and other related information. It may be used for interacting with a database to create, read, update, and delete user records.

        The exact implementation of the User model and its methods would depend on your application's specific requirements and the database system you are using (e.g., MongoDB, PostgreSQL, MySQL).

Overall, these lines of code are typical in a Node.js application that uses Passport for authentication, data validation with the validator library, and a custom user model (User) for managing user data. These modules and models are often essential components of an authentication system in web development.
*/


exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};


/*
The code you've provided appears to be a set of route handlers for user authentication and registration within an Express.js application. These route handlers define the behavior for different HTTP requests related to user login, logout, and signup. Let's break down each of these route handlers:

    exports.getLogin:
        This route handler handles GET requests to the "/login" path. It is used for rendering the login page.
        If the user is already authenticated (indicated by req.user), it redirects them to the "/profile" page.
        Otherwise, it renders the "login" view, passing a title to the view.

    exports.postLogin:
        This route handler handles POST requests to the "/login" path, which are typically used for processing user login attempts.
        It first performs data validation using the validator library to check if the email is valid and if the password is not empty.
        If there are validation errors, it sets flash messages and redirects the user back to the login page.
        If there are no validation errors, it uses Passport's passport.authenticate() middleware with the "local" strategy to attempt user authentication. If authentication fails, it sets flash messages and redirects to the login page. If authentication succeeds, it logs the user in, sets a success flash message, and redirects them to the "/profile" page.

    exports.logout:
        This route handler handles GET requests to the "/logout" path. It is used for logging the user out.
        It calls req.logout() to log the user out, and then it destroys the session to remove the user's session data.
        Finally, it redirects the user to the root path ("/").

    exports.getSignup:
        This route handler handles GET requests to the "/signup" path. It is used for rendering the signup page.
        If the user is already authenticated (indicated by req.user), it redirects them to the "/profile" page.
        Otherwise, it renders the "signup" view, passing a title to the view.

    exports.postSignup:
        This route handler handles POST requests to the "/signup" path, which are typically used for user registration.
        It performs data validation on the email, password length, and password confirmation.
        If there are validation errors, it sets flash messages and redirects the user back to the signup page.
        If there are no validation errors, it normalizes the email, creates a new user object, and checks if a user with the same email or username already exists in the database.
        If a matching user is found, it sets flash messages and redirects to the signup page.
        If no matching user is found, it saves the new user to the database, logs them in, and redirects to the "/profile" page.

These route handlers appear to implement user authentication and registration logic in an Express.js application. The implementation may vary depending on the specifics of your application, such as the database used for user storage and the authentication strategy (in this case, the "local" strategy is used).


*/