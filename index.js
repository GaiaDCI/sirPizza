// const fs = require("fs");

const path = require("path");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const pizzas = require("./routes/pizzas");
const User = require("./models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose
  .connect(`mongodb://localhost:27017/sirPizza`, { useNewUrlParser: true })
  .then(() => {
    console.log("server is working.");
  })
  .catch(error => {
    console.log(`The following error occurred: ${error.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/pizzas", pizzas);
app.use("/", pizzas);
app.use(
  require("express-session")({
    secret: "Rusty is the best og in the world",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
