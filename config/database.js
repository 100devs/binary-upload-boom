const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // DB connection server call
    const conn = await mongoose.connect(process.env.DB_STRING, {
      // old settings required for old mongoDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    // kill node process
    process.exit(1);
  }
};

module.exports = connectDB;
