const multer = require("multer");
const path = require("path");

//this is just methods.

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !==".webp" && ext !== ".svg" && ext !== ".gif") {   //checking file types.
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});