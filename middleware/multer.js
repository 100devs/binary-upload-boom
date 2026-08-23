// import multer, a popular node middleware used for handling multipart form data, which is the format required when users upload files (like images, PDFs, or videos) through HTML forms.

const multer = require("multer");
const path = require("path");


// export multer configuration to be used elsewhere in the application
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
