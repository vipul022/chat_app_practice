const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth_routes");
const chatroomRouter = require("./routes/chatroom_routes");
const exphbs = require("express-handlebars");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); //session here is mapped with the const session on line 8, both should be same
require("dotenv").config();

const passport = require("passport");
const port = process.env.port || 3000;

// middlewares

app.use(cors());
app.use(express.json());
//handlebars stuff
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(
  //this is required to parse the data coming from submitting the form
  express.urlencoded({
    extended: true,
  })
);

// express session stores session id as a cookie and reads the cookie on server side and stores data on server side
app.use(
  session({
    secret: "secret key", // this should not be included in source code, must be hidden
    resave: false,
    saveUninitialized: false, //in canvas it is set as true but we need to set it as false in future projects
    cookie: { expires: 600000 }, //this is 10 minutes 10*60*1000
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }) //this is setting up session connection with database so that session is saved in db
);

//connecting passport to app
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session()); //this keeps track of logged in user

// const dbConn = "mongodb://localhost/chat-app-test";
const dbConn = process.env.MONGODB_URI || "mongodb://localhost/chat-app-test" ;

mongoose.connect(
  dbConn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("Error connecting to database", err);
    } else {
      console.log("Connected to database!");
    }
  }
);

app.use("/user", authRouter);
app.use("/", chatroomRouter);
app.listen(port, () => {
  console.log(`Chat app listening on port ${port}`);
});
