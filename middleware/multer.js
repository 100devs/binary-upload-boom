const multer = require("multer");
//USED FOR UPLOADING IMAGES
const path = require("path");
//Imports the path module, which provides utilities for working with file and directory paths.

//Exports a configured instance of multer so it can be used elsewhere in your app.

module.exports = multer({
  storage: multer.diskStorage({}),//Specifies the storage engine for uploaded files.
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);//Extracts the file extension (e.g., .jpg, .png) from the original file name of the uploaded file using path.extname.
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png")//Checks if the file extension is not one of the supported types (.jpg, .jpeg, .png).
     {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
