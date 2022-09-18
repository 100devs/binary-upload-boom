const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
cloudinary.config({ 
  cloud_name: 'wo1vin', 
  api_key: dotenv.API_KEY,
  api_secret: dotenv.API_SECRET
});

module.exports = connectDB;
