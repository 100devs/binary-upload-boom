const mongoose = require("mongoose"); //mongoose is here to connect to the database

//setting up the mongoose connection to the database
const connectDB = async () => { //async is used here to make sure that the connection is made before the server starts listening for requests
  try { //try is used here to catch any errors that might occur
    const conn = await mongoose.connect(process.env.DB_STRING, { //here we are connecting to the database using the connection string from the .env file
      useNewUrlParser: true, //useNewUrlParser is used to make sure that the connection is made using the new url parser, the url parser is used to parse the connection string into a url that mongoose can use to connect to the database
      useUnifiedTopology: true, //the purpose of useUnifiedTopology is to make sure that the connection is made using the new server discovery and monitoring engine, the topology engine is used to monitor the database and make sure that the connection is still active
      useFindAndModify: false, //the purpose of useFindAndModify is to make sure that the connection is made using the findAndModify function, the findAndModify function is used to find and modify the data in the database
      useCreateIndex: true, //the purpose of useCreateIndex is to make sure that the connection is made using the createIndex function, the createIndex function is used to create indexes in the database, these indexes are used to make sure that the data in the database is unique and cannot be duplicated
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); //here we are logging the connection string to the console to make sure that the connection is made successfully and to make sure that the connection string is correct and is not missing any information
  } catch (err) { //catch is used here to catch any errors that might occur
    console.error(err); //here we are logging the error to the console
    process.exit(1); //here we are exiting the process with an exit code of 1, this means that the process has failed and has exited with an error
  }
};

module.exports = connectDB; //here we are exporting the connectDB function so that it can be used in other files in the project
