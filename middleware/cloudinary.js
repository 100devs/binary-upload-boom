const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" }); // Looking at the .env file to see the cloudinary information

cloudinary.config({ // Telling cloudinary the cloudinary information for where to put the file
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary; // Exporting this so we can reference it
