const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({ 
  cloud_name: 'database100devs', 
  api_key: '638533423861261', 
  api_secret: 'Ng60d4s1C-_FFtNBD7IA5opsSbU' 
});

module.exports = cloudinary;
