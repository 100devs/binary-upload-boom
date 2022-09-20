//auth.js controller contains the getLogin, postLogin, logout, getSignup, and postSignup functions to handle the login, logout, and signup routes.

const passport = require("passport"); //passport is used here to authenticate the user using the local strategy defined in config/passport.js and then redirect the user to the profile page if the authentication is successful or to the login page if the authentication fails.
const validator = require("validator"); //the purpose of validator here is to validate the user input and to display the appropriate error message if the user input is invalid.
const User = require("../models/User"); //importing the User model from models/User.js to use the User model to find the user in the database and to update the user's profile information.

//getLogin function is used to render the login page
exports.getLogin = (req, res) => { //getLogin function is called when the user visits the login page
  if (req.user) { //if the user is already logged in, the user is redirected to their profile page instead of the login page
    return res.redirect("/profile"); //redirecting the user to the profile page if the user is already logged in
  }
  res.render("login", { //rendering the login page if the user is not logged in
    title: "Login", //title of the login page
  });
};

//postLogin function is used to authenticate the user using the local strategy defined in config/passport.js and then redirect the user to the profile page if the authentication is successful or to the login page if the authentication fails.
exports.postLogin = (req, res, next) => { //postLogin function is called when the user submits the login form
  const validationErrors = []; //an array to store the validation errors
  if (!validator.isEmail(req.body.email)) //if the email is not valid, an error message is pushed to the validationErrors array
    validationErrors.push({ msg: "Please enter a valid email address." }); //pushing the error message to the validationErrors array
  if (validator.isEmpty(req.body.password)) //if the password is empty, an error message is pushed to the validationErrors array
    validationErrors.push({ msg: "Password cannot be blank." }); //pushing the error message to the validationErrors array

  if (validationErrors.length) { //if there are any validation errors, the user is redirected to the login page and the error messages are displayed on the login page
    req.flash("errors", validationErrors); //displaying the error messages on the login page, the purpose of flash is to display the error messages on the login page only once and then the error messages are cleared from the session.
    return res.redirect("/login"); //redirecting the user to the login page if there are any validation errors
  }
  req.body.email = validator.normalizeEmail(req.body.email, { //normalizing the email address to remove any dots in the email address, the purpose of normalizing the email address is to make sure that the email address is stored in the database in the same format as the email address entered by the user.
    gmail_remove_dots: false, //gmail_remove_dots is set to false because we do not want to remove the dots from the email address if the email address is a gmail address.
  });

  //passport.authenticate is used to authenticate the user using the local strategy defined in config/passport.js and then redirect the user to the profile page if the authentication is successful or to the login page if the authentication fails.
  passport.authenticate("local", (err, user, info) => {
    if (err) { //if there is an error, the user is redirected to the login page
      return next(err); //redirecting the user to the login page if there is an error
    }
    if (!user) { //if the user is not found, the user is redirected to the login page
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => { //if the user is found, the user is logged in and redirected to the profile page
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." }); //displaying the success message on the profile page
      res.redirect(req.session.returnTo || "/profile"); //redirecting the user to the profile page
    });
  })(req, res, next);
};

//logout function is used to log out the user and redirect the user to the login page
//Here is what's happening step by step:
//logout function is called when the user visits the logout route
//this logout function takes in the request and response objects as parameters
//the request object contains the user information and the response object is used to redirect the user to the login page
//after the logout function is called, req.logout() is called to log out the user
//req.logout() is a function provided by passport to log out the user and remove the user information from the session and then redirect the user to the login page using res.redirect("/login")
//Passport exposes a logout() function on req (also aliased as logOut()) that can be called from any route handler which needs to terminate a login session
//how it exposes this function on req is from the middleware that is registered by passport.initialize() and passport.session()
//passport.initialize() is a middleware that is used to initialize Passport and to add the passport object to the request object and to add the methods to the request object that are used to authenticate the user and to log out the user
//passport.session() is a middleware that is used to add the user information to the session and to remove the user information from the session and to deserialize the user information from the session
exports.logout = (req, res) => { //logout function is called when the user visits the logout route
  req.logout(() => { //req.logout is used to log out the user
    console.log('User has logged out.')
  })
  req.session.destroy((err) => { //req.session.destroy is used to destroy the session and remove the user information from the session
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null; //removing the user information from the request object
    res.redirect("/");
  });
};

//getSignup function is used to render the signup page
exports.getSignup = (req, res) => { //getSignup function is called when the user visits the signup page, (req, res) are the parameters of the getSignup function that are used to render the signup page
  if (req.user) { //if the user is already logged in, the user is redirected to their profile page instead of the signup page
    return res.redirect("/profile"); //redirecting the user to the profile page if the user is already logged in
  }
  res.render("signup", { //rendering the signup page if the user is not logged in
    title: "Create Account", //title of the signup page which is displayed on the signup page
  });
};

//postSignup function is used to create a new user and then redirect the user to the profile page if the user is created successfully or to the signup page if the user is not created successfully
exports.postSignup = (req, res, next) => { //postSignup function is called when the user submits the signup form, next is a function that is used to call the next middleware in the stack
  const validationErrors = []; //an array to store the validation errors
  if (!validator.isEmail(req.body.email)) //if the email is not valid, an error message is pushed to the validationErrors array
    validationErrors.push({ msg: "Please enter a valid email address." }); //pushing the error message to the validationErrors array
  if (!validator.isLength(req.body.password, { min: 8 })) //if the password is less than 8 characters, an error message is pushed to the validationErrors array
    validationErrors.push({ //pushing the error message to the validationErrors array
      msg: "Password must be at least 8 characters long", //error message to be displayed on the signup page
    });
  if (req.body.password !== req.body.confirmPassword) //if the password and the confirm password do not match, an error message is pushed to the validationErrors array
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) { //if there are any validation errors, the user is redirected to the signup page and the error messages are displayed on the signup page
    req.flash("errors", validationErrors); //displaying the error messages on the signup page, the purpose of flash is to display the error messages on the signup page only once and then the error messages are cleared from the session.
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({ //creating a new user using the User model
    userName: req.body.userName, //setting the userName property of the user object to the userName entered by the user on the signup page
    email: req.body.email, //setting the email property of the user object to the email entered by the user on the signup page
    password: req.body.password, //setting the password property of the user object to the password entered by the user on the signup page
  });

  User.findOne( //finding the user in the database using the findOne method of the User model
      //$or is a logical operator that is used to match the documents that satisfy at least one of the conditions specified in the $or clause, in this case the user is found using the email or the userName
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] }, //finding the user in the database using the email or the userName entered by the user on the signup page,
    (err, existingUser) => { //existingUser is the user that is found in the database using the findOne method of the User model, projection is used to specify the fields that are returned in the documents that match the query criteria
      if (err) { //if there is an error, the error is passed to the next middleware in the stack
        return next(err);
      }
      if (existingUser) { //if the user is found in the database, the user is redirected to the signup page and an error message is displayed on the signup page
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }

      user.save((err) => { //saving the user to the database using the save method of the User model
        if (err) {
          return next(err); //if there is an error, the error is passed to the next middleware in the stack
        }
        req.logIn(user, (err) => { //logging in the user using the logIn method of the req object
          if (err) { //if there is an error, the error is passed to the next middleware in the stack
            return next(err);
          }
          res.redirect("/profile"); //redirecting the user to the profile page if the user is created successfully
        });
      });
    }
  );
};
