const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });
// cloudinary config using env variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Export functions for the app 
module.exports = cloudinary;
