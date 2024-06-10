const multer = require("multer");
const path = require("path");

module.exports = multer({
  //not specifiying any disk space
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    //getting the path 
    let ext = path.extname(file.originalname);
    //sanitize the input making sure it is an image
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
