const passport = require("passport"); // Import passport
const validator = require("validator");  // Import validator
const User = require("../models/User"); // Import User model

exports.getLogin = (req, res) => { // Get login page
  if (req.user) { // If user is logged in
    return res.redirect("/profile"); // Redirect to profile page
  }
  res.render("login", { // Render login page
    title: "Login", // Title of page
  });
};

exports.postLogin = (req, res, next) => { // Post login page
  const validationErrors = []; // Create array for validation errors
  if (!validator.isEmail(req.body.email)) // If email is not valid
    validationErrors.push({ msg: "Please enter a valid email address." }); // Add error to array
  if (validator.isEmpty(req.body.password)) // If password is empty
    validationErrors.push({ msg: "Password cannot be blank." }); // Add error to array

  if (validationErrors.length) { // If there are errors
    req.flash("errors", validationErrors); // Flash errors
    return res.redirect("/login"); // Redirect to login page
  }
  req.body.email = validator.normalizeEmail(req.body.email, { // Normalize email
    gmail_remove_dots: false, // Remove dots from gmail
  });

  passport.authenticate("local", (err, user, info) => { // Authenticate user
    if (err) { // If error
      return next(err); // Return error
    }
    if (!user) { // If user does not exist
      req.flash("errors", info); // Flash errors
      return res.redirect("/login"); // Redirect to login page
    }
    req.logIn(user, (err) => { // Log in user
      if (err) { // If error
        return next(err); // Return error
      }
      req.flash("success", { msg: "Success! You are logged in." }); // Flash success message
      res.redirect(req.session.returnTo || "/profile"); // Redirect to profile page
    });
  })(req, res, next); // Call passport authenticate
};

exports.logout = (req, res) => { // Logout user
  req.logout(() => { // Logout user
    console.log('User has logged out.') // Log that user has logged out
  })
  req.session.destroy((err) => { // Destroy session
    if (err)  // If error
      console.log("Error : Failed to destroy the session during logout.", err); // Log error
    req.user = null; // Set user to null
    res.redirect("/"); // Redirect to home page
  });
};

exports.getSignup = (req, res) => { // Get signup page
  if (req.user) { // If user is logged in
    return res.redirect("/profile"); // Redirect to profile page
  }
  res.render("signup", { // Render signup page
    title: "Create Account", // Title of page
  });
};

exports.postSignup = (req, res, next) => { // Post signup page
  const validationErrors = []; // Create array for validation errors
  if (!validator.isEmail(req.body.email)) // If email is not valid
    validationErrors.push({ msg: "Please enter a valid email address." }); // Add error to array
  if (!validator.isLength(req.body.password, { min: 8 })) // If password is less than 8 characters
    validationErrors.push({ // Add error to array
      msg: "Password must be at least 8 characters long", // Error message
    });
  if (req.body.password !== req.body.confirmPassword) // If passwords do not match
    validationErrors.push({ msg: "Passwords do not match" }); // Add error to array

  if (validationErrors.length) { // If there are errors
    req.flash("errors", validationErrors); // Flash errors
    return res.redirect("../signup"); // Redirect to signup page
  }
  req.body.email = validator.normalizeEmail(req.body.email, { // Normalize email
    gmail_remove_dots: false, // Remove dots from gmail
  });

  const user = new User({ // Create new user
    userName: req.body.userName, // Set username
    email: req.body.email, // Set email
    password: req.body.password, // Set password
  });

  User.findOne( // Find user
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] }, // Find user by email or username
    (err, existingUser) => { // Callback function
      if (err) { // If error
        return next(err); // Return error
      }
      if (existingUser) { // If user exists
        req.flash("errors", { // Flash error
          msg: "Account with that email address or username already exists.", // Error message
        });
        return res.redirect("../signup"); // Redirect to signup page
      }
      user.save((err) => { // Save user
        if (err) { // If error
          return next(err); // Return error
        }
        req.logIn(user, (err) => { // Log in user
          if (err) { // If error
            return next(err); // Return error
          }
          res.redirect("/profile"); // Redirect to profile page
        });
      });
    }
  );
};
