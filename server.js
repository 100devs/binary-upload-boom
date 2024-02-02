const express = require("express"); //helps build out app (initializes Express)
const app = express(); //assigns express to this variable (DRY)
const mongoose = require("mongoose"); //helps talk to mongodb database
const passport = require("passport"); // authentication. enables different strategies for different login types
const session = require("express-session"); //sessions needed for users to stay logged in while movig across application. also helps show WHO is logged in, which can help with bulding profile pages. uses Cookies
const MongoStore = require("connect-mongo")(session); //saves session in mongoDB so Users remain logged in even if they leave the application
const methodOverride = require("method-override"); //browser client only does GET and POST methods, so this allows for overriding methods and helps code work across additional clients (require is a function and (session) is the argument being called)
const flash = require("express-flash"); //makes warnings pop up e.g: invalid password/ username exists/ email already used etc
const logger = require("morgan"); //logs requests made, to the terminal (dev dependency, not pushed to production)
const connectDB = require("./config/database"); //connect to database
const mainRoutes = require("./routes/main"); //basic route
const postRoutes = require("./routes/posts"); 
const commentRoutes = require("./routes/comments");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); //

// Passport config
require("./config/passport")(passport); //require("file")(excute Passport)

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static assests Folder
app.use(express.static("public"));

//Body Parsing - for pulling things out of form requests
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//Logging - gets morgan running
app.use(logger("dev"));

//Use forms for put / delete requests
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }), //store each session in the database
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());//tells passport there will be sessions 

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
