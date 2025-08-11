const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Customer = require("../models/Customer");
const Company = require("../models/Company");

module.exports = function (passport) {
  const authenticateUser = async (Model, email, password, done) => {
    try {
      const user = await Model.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, {
          msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    } catch (err) {
      return done(err);
    }
  };

  passport.use('company-local',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      authenticateUser(Company, email, password, done);
    })
  );

  passport.use('customer-local',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      authenticateUser(Customer, email, password, done);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Company.findById(id) || await Customer.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};


// const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
// const Customer = require("../models/Customer");
// const Company = require("../models/Company");

// module.exports = function (passport) {
//   passport.use('company-local',
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       Company.findOne({ email: email.toLowerCase() }, (err, company) => {
//         if (err) {
//           return done(err);
//         }
//         if (!company) {
//           return done(null, false, { msg: `Email ${email} not found.` });
//         }
//         if (!company.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }
//         company.comparePassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );

//   passport.use('customer-local',
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       Customer.findOne({ email: email.toLowerCase() }, (err, customer) => {
//         if (err) {
//           return done(err);
//         }
//         if (!customer) {
//           return done(null, false, { msg: `Email ${email} not found.` });
//         }
//         if (!customer.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }
//         customer.comparePassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, done) => {
//     console.log("user passport.js config", user)
//     done(null, user._id);
//   });

//   passport.deserializeUser((obj, done) => {
//     console.log("passport.js config", obj)
//     const Model = obj.companyName ? Company : Customer
//     Model.findById(obj._id, (err, user) => done(err, user));
//   });
// }

  