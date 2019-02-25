const path = require("path");
const bodyParser = require("body-parser"); //allow me to catch and what I enter on the Dom

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const pizzas = require("./routes/pizzas");

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

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
