const express = require("express"); //so we can ejs
const app = express(); //cause it's an app
const mongoose = require("mongoose"); //so we can  model
const passport = require("passport"); //so we can auth
const session = require("express-session"); //so we can have cookies
const MongoStore = require("connect-mongo")(session); //so we can hang on to those cookies
const methodOverride = require("method-override"); //override some bullshit
const flash = require("express-flash"); //so we can flash an error message
const logger = require("morgan"); //yo i don't remember 
const connectDB = require("./config/database"); //so we can connect to the database duh!!
const mainRoutes = require("./routes/main"); //the routes
const postRoutes = require("./routes/posts"); //for posts
const commentRoutes = require("./routes/comments"); //and comments


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public")); //i wish i knew what this was, is it cause you don't want randos changing "public" ??

//Body Parsing
app.use(express.urlencoded({ extended: true })); //i'mma parse dat body-ody-ody-ody
app.use(express.json()); //jjjjjjson, de ruuuuulo

//Logging
app.use(logger("dev")); //are we console logging or are we logging people's activity n stuff on our app/database?

//Use forms for put / delete
app.use(methodOverride("_method")); //forms be doing methods 

// Setup Sessions - stored in MongoDB
app.use( //use express ofc
  session({ 
    secret: "keyboard cat", //secret stuff just in case
    resave: false, //don't resave
    saveUninitialized: false, 
    store: new MongoStore({ mongooseConnection: mongoose.connection }), //make a new sesh
  })
);

// Passport middleware
app.use(passport.initialize()); //just keeps stuff organized...
app.use(passport.session()); //in a session!

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!"); //go go go go!
});
