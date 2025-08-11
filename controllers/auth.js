const passport = require("passport");
const validator = require("validator");
const Customer = require("../models/Customer");
const Company = require("../models/Company");
const cloudinary = require("../middleware/cloudinary");

exports.getCustomerLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/feed");
  }
  res.render("customerLogin", {
    title: "Login",
  });
};

exports.getCompanyLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/feed");
  }
  res.render("companyLogin", {
    title: "Login",
  });
};

exports.postCustomerLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/customerLogin");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("customer-local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/customerLogin");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/feed");
    });
  })(req, res, next);
};

exports.postCompanyLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/companyLogin");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("company-local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/companyLogin");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/companyProfile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getCustomerSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/customerProfile");
  }
  res.render("customerSignup", {
    title: "Create Account",
  });
};

exports.getCompanySignup = (req, res) => {
  if (req.user) {
    return res.redirect("/companyProfile");
  }
  res.render("companySignup", {
    title: "Create Account",
  });
};

exports.postCustomerSignup = (req, res, next) => {
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
    return res.redirect("../customerSignup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const customer = new Customer({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  Customer.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingCustomer) => {
      if (err) {
        return next(err);
      }
      if (existingCustomer) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../customerSignup");
      }
      customer.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(customer, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/customerProfile");
        });
      });
    }
  );
};

exports.postCompanySignup = async (req, res, next) => {
  try {
    console.log("req.body.email", req.body);
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
      return res.redirect("../companySignup");
    }

    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    // Await the Cloudinary upload
    let result;
    if (req.file) {
      try {
        result = await cloudinary.uploader.upload(req.file.path);
      } catch (error) {
        console.log("Error uploading image to Cloudinary:", error);
      }
    } else {
      console.log("No file to upload");
    }

    const newCompany = new Company({
      companyName: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      image: result ? result.secure_url : undefined,
      cloudinaryId: result ? result.public_id : undefined,
      companyDescription: req.body.companyDescription,
    });

    // Await the database query
    const existingCompany = await Company.findOne({
      $or: [{ email: req.body.email }, { companyName: req.body.companyName }],
    });

    if (existingCompany) {
      req.flash("errors", {
        msg: "Account with that email address or company name already exists.",
      });
      return res.redirect("../companySignup");
    }

    // Await the save operation
    await newCompany.save();

    req.logIn(newCompany, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/companyProfile");
      console.log("company is logged in");
    });
  } catch (err) {
    console.log(err);
  }
};
