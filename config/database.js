// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection string from the .env file
    const conn = await mongoose.connect(process.env.DB_STRING, {
      // Use the new URL parser to handle MongoDB connection strings
      useNewUrlParser: true,
      // Use the new unified topology engine for better server discovery and monitoring
      useUnifiedTopology: true,
      // Avoid deprecation warning for findOneAndUpdate() and similar methods
      useFindAndModify: false,
      // Avoid deprecation warning for ensureIndex() by using createIndex() instead
      useCreateIndex: true,
    });

    // Log a message if the connection is successful
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Log any connection errors
    console.error(err);
    // Exit the process with failure code if connection fails
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in server.js or other files
module.exports = connectDB;
