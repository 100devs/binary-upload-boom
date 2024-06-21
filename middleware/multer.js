const multer = require("multer");
const path = require("path");



module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== '.pdf' && ext !== '.heic') {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
