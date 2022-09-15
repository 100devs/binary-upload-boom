const multer = require("multer"); // Import multer
const path = require("path"); // Import path

module.exports = multer({ // Export multer
  storage: multer.diskStorage({}), // Set storage to disk
  fileFilter: (req, file, cb) => { // Set file filter
    let ext = path.extname(file.originalname); // Get file extension
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { // If file extension is not jpg, jpeg, or png
      cb(new Error("File type is not supported"), false); // Return error
      return; // Return
    }
    cb(null, true); // Else, return true
  },
});
