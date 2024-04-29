//imports multer
const multer = require("multer");
//imports path
const path = require("path");

//exports this function
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // sets the different types of files we accept
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      //sends error file type not supported if not matching
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
