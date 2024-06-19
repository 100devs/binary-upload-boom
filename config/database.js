// Core Modules
const mongoose = require("mongoose"); // Requiring Mongoose

// Begin of connectDB async function
const connectDB = async () => {
  // Opening for Try Catch
  try {
    // await to process the env file database string
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true, // Mongoose Deprecation Fixes
      useUnifiedTopology: true, // Mongoose Deprecation Fixes
      useFindAndModify: false, // Mongoose Deprecation Fixes
      useCreateIndex: true, // Mongoose Deprecation Fixes
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // Console log to tell us MongoDB is connected
    // Opening for Catch
  } catch (err) {
    console.error(err); // Console Log for Error
    process.exit(1); // end the process which is running, 1 Means end the process with some failure
  } // Closing Bracket for Catch
}; // Closing Bracket for Async

module.exports = connectDB; // Exporting the connectDB async function
