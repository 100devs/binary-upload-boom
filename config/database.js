const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // process.env.DB_STRING
    // "mongodb+srv://sachi:1234@cluster0.ckuhicx.mongodb.net/?retryWrites=true&w=majority"
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

module.exports = connectDB;
