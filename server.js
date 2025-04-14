const express = require("express"); //import the Express.JS framework into this application and assign it to a constant called "express." This "express" variable acts as an interface through which we gain access to Express.JS functionalities.  


const app = express(); //Call the express function (provided by the Express.JS Framework). This creates an instance of an express application. This instance of express is an Object which we assign to a constant called "app." We use this to handle HTTP requests, define routes, and start the server.


const mongoose = require("mongoose"); //import the mongoose library into this application and store it in a constant variable named "mongoose." This will allow us to interact with MongoDB and perform CRUD operations. 


const passport = require("passport"); //import the passport middleware into this application and store it in a constant variable named "passport."  


const session = require("express-session"); //import the express-session middleware into this application and store it in a variable named "session." express-session allows for the creation and storage of session data. 


const MongoStore = require("connect-mongo")(session); //import the connect-mongo package into this application, which is used to store session data in a MongoDB database. Pass in the express-session middleware "session" as an argument to configure connect-mongo to work with the provided session. This returns a new store object for storing and retrieving data from the database rather than from memory. 


const methodOverride = require("method-override"); //import the method-override middleware into this application and store it in a constant variable name "methodOverride." With this, forms can make PUT and DELETE requests. 


const flash = require("express-flash"); //import the express-flash middleware into this application and store it in a variable named "flash" express-flash is used to display one time messages (notifications)


const logger = require("morgan"); //import the morgan middleware into this application and store it in a variable named "logger." This will automatically log HTTP requests and errors. 


const connectDB = require("./config/database"); //import the local module from the file specified by the path "./config/database" to access its data. Assign all functionality of that module to a constant named "connectDB." In this case, the module referenced contains the requisite logic for connecting to a database


const mainRoutes = require("./routes/main"); //import the route handling logic for main routes from the local module specified by the path "./routes/main" store its functionality (an express router) in a variable named "mainRoutes"


const postRoutes = require("./routes/posts"); //import the route handling logic for post routes from the local module specified by the path "./routes/posts" and store its functionality (an express router) in a variable named "mainRoutes"


const commentRoutes = require("./routes/comments.route") //import the route handling logic for comment routes from the specified path "./routes/comments.route" and store its functionality (an express router) in a variable named "commentRoutes"

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport configuration
// import the logic for setting up passport authentication, which is in this case- a function, and provide it with the passport object as an argument. 
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
//app.use() is a method in Express.js that adds middleware to an application.
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true })); //use the urlencoded middleware, used to parse data sent by forms.
app.use(express.json()); // middleware for parsing request bodies with json payloads, makes the parsed data available in req.body

//Logging
app.use(logger("dev")); //'dev' is a predefined logging format for used by morgan


//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

