const path = require("path");
const bodyParser = require("body-parser"); //allow me to catch and what I enter on the Dom

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const pizzas = require("./routes/pizzas");

let url = process.env.MONGODB_URI;

mongoose
  .connect(`${url}`, { useNewUrlParser: true })
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

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening at port 3000");
});
