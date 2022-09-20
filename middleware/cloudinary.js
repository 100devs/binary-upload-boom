const cloudinary = require("cloudinary").v2; // Import cloudinary

require("dotenv").config({ path: "./config/.env" }); // Import environment variables

cloudinary.config({ // Configure cloudinary
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary; // Export cloudinary
