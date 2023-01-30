const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  //Not storing to our own disc locally so that is why the above is empty.
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
  // Methods inside an object. This relates to uploading images. It checks to make sure it is a jpg, jpeg or png. If not, it will throw an error.
});
