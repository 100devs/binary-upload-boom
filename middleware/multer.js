const multer = require("multer");
const path = require("path");

module.exports = multer({ //grab single image
  storage: multer.diskStorage({}), //use temp storage on multer
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false); //do not continue
      return;
    }
    cb(null, true); //continue
  },
});
