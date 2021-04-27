const multer = require("multer");
module.exports = {
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "/src/post-images");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    },
  }),
};
