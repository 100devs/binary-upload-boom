const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { any } = require("../middleware/multer");

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  image: {
    type: String,
    require: false,
    default: null
  },
  companyIconCloudinaryId: {
    type: String,
    require: false,
    default: null
  },
  companyDescription: {
    type: String,
    required: false,
    default: null
  },
});

// Password hash middleware.

CompanySchema.pre("save", function save(next) {
  const company = this;
  if (!company.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(company.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      company.password = hash;
      next();
    });
  });
});

// Helper method for validating company's password.

CompanySchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("Company", CompanySchema);
