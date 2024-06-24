const multer = require("multer");
const path = require("path");

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


/*
The code provided sets up and exports a configuration for the multer middleware, which is commonly used in Express.js applications for handling file uploads. This configuration defines how uploaded files should be stored and filters the allowed file types. Let's break down what this code does:

    const multer = require("multer");:
        This line imports the multer middleware, which is a popular middleware for handling file uploads in Node.js and Express.js applications.

    const path = require("path");:
        This line imports the path module, which is a built-in Node.js module used for working with file paths and directories.

    module.exports = multer({ ... });:

        This code exports a configuration object for multer. The configuration specifies two main options:

            storage: This option determines where and how uploaded files should be stored. In this case, it's using multer.diskStorage({}), which indicates that uploaded files should be stored on the server's disk.

            fileFilter: This option is a function that filters the uploaded files based on their file extensions. It checks if the file extension is ".jpg", ".jpeg", or ".png" (common image formats). If the uploaded file doesn't have one of these extensions, it calls the callback function cb with an error and false to indicate that the file should not be accepted. If the file has an allowed extension, it calls the callback with no error and true.

This configuration ensures that only files with the extensions ".jpg", ".jpeg", or ".png" are accepted for upload. Any other file types will result in an error.

You can use this multer configuration in your Express.js routes to handle file uploads. Here's an example of how you might use it in a route handler

*/