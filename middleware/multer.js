const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}), // not specifying any disk storage here. not storing files here, cloudinary will be used for that. multer holds the files in a temporary folder until the request is done, then it deletes it. 
  fileFilter: (req, file, cb) => { // setting a filter on the files
    let ext = path.extname(file.originalname); // getting the path
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { // validation to make sure the correct file type is being received. 
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
