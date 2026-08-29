const mongoose = require("mongoose"); // importing mongoose

const connectDB = async () => { // create a connection function
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, { // connects to the mongodb database specified by the db_string and stores connection in conn
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); // log the db host
  } catch (err) {
    console.error(err); // prints error to terminal
    process.exit(1); // stops the application
  }
};

module.exports = connectDB; // exports the connectdb function
