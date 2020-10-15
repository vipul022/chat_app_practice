const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth_routes");
const chatroomRouter = require("./routes/chatroom_routes");
const exphbs = require("express-handlebars");
require("dotenv").config();

const port = process.env.port || 3000;

// middlewares
const app = express();
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

const dbConn = process.env.MONGODB_URI;

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
