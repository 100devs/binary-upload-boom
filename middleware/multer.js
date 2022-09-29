const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}), // we are not storing to our own disk locally
  fileFilter: (req, file, cb) => { 
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { // we're limiting the file selection to these file types...before setting these filters, we should first check out cloudinary and see that it supports these file types
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
