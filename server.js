const express = require("express");//USE EXPRESS TO MAKE USING NODEJS EASIER LOL
const app = express();
//WRAP THE EXPRESS FUNCTION IN APP VAR
const mongoose = require("mongoose");
//USE MONGOOSE TO TALK TO MONGODB EASIER
const passport = require("passport");
////USE PASSPORT PACKAGE FOR AUTH
const session = require("express-session");
// USE SESSION PACKAGE TO HANDLE THE COOKIES ON THE USER COMPUTER THAT MATCHES THE SESSIONS STORED IN OUR DB SO THE USER CAN STAY LOGGED IN
const MongoStore = require("connect-mongo")(session);
// USE SESSION PACKAGE TO HANDLE THE COOKIES ON THE USER COMPUTER THAT MATCHES THE SESSIONS STORED IN OUR DB SO THE USER CAN STAY LOGGED IN
const methodOverride = require("method-override");
//overrides the HTTP method of a request if a specific parameter or header is present.
const flash = require("express-flash");
//GIVE US A NOTIFICATION IN CASE WE LOGIN WRONG OR SIGNUP USING WRONG INFORMATION
const logger = require("morgan");
//DEBUGGER AND WILL KEEP THE LOG OF EVERY REQ THAT COMES THRU INSTEAD OF CONSOLE LOG EVER LINE OF CODE
const connectDB = require("./config/database");
//CONNECT TO DB USING CONFIG FOLDER AND DB FILE
const mainRoutes = require("./routes/main");
//LINK TO OUR MAIN ROUTE
const postRoutes = require("./routes/posts");
//LINK TO OUR POST ROUTE
const commentRoutes = require("./routes/comments");
//LINK TO OUR POST ROUTE

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
/// TELL EXPRESS TO USE OUR ENV VAR. WE CAN USE BUN INSTEAD WHICH HAS ENV VAR BUILT IN

// Passport config
require("./config/passport")(passport);
//TELLS EXPRESS TO USE PASSPORT 

//Connect To Database
connectDB();//FUNC TO CONNECT TO OUR DB

//Using EJS for views
app.set("view engine", "ejs");//SET THE VIEW ENGINE AS EJS

//Static Folder
app.use(express.static("public"));//HANDLES THE CSS AND JS

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());// ENABLES US TO LOOK AT THE REQ BODY COMING FROM THE FORM AND OULL WHAT WE NEED FROM IT

//Logging
app.use(logger("dev"));//HELPS US TO SET UP MORGAN AND LOG EVERYTHING

//Use forms for put / delete
app.use(methodOverride("_method"));//IF THE _METHOD EXISIT THEN THE MIDDLEWARE WILL USE METHODOVERRIDE TO OVERRIDE THE ORGINAL METHOD OF PUT, DELETE, POST

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
app.use(passport.initialize());//SETUP PASSPORT AS AUTH
app.use(passport.session());//THEN USE SESSIONS ALONG WITH PASSPORT

//Use flash messages for errors, info, ect...
app.use(flash());
//SETUP FLASH FOR ALERTS

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);//REQUEST ON THE MAIN ROUTE, USE THE MAINROUTE IN THE ROUTE FOLDER 
app.use("/post", postRoutes);
//REQ ON THE POST ROUTE, USE THE POSTROUTES FOLDER.
app.use("/comment", commentRoutes);
//REQ ON THE COMMENT ROUTE, USE THE COMMENTROUTES FOLDER.


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
 //HAVE THE SERVER LISTEN ON THE SET PORT OR WHATEVER PORT ISSUED BY ENV
});
