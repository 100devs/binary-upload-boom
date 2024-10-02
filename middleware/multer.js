const multer = require("multer");
const path = require("path");

//code for image upload using multer
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { //prevents use of image filetypes other than .jpg, .jpeg, and .png
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
