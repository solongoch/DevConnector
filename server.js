const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Body parser config
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Passport configuration
app.use(passport.initialize());
require("./config/passport")(passport);

// Db config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

// First route, for any request, respond 'Hello'
app.get("/", (req, res) => res.send("Hello!"));

// use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = "8000";
app.listen(port, () => console.log(`Server is running on port ${port}`));
