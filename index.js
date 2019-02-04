// const fs = require("fs");

const path = require("path");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const pizzas = require("./routes/pizzas");

////////////////
// const listDataBase = fs.readFileSync(
//   path.join(__dirname, "json", "listdb.json"),
//   "utf8"
// );
// console.log(listDataBase);

// const celavemofatta = JSON.parse(listDataBase);
// console.log(celavemofatta);
////////////////////

mongoose
  .connect(`mongodb://localhost:27017/restos`, { useNewUrlParser: true })
  .then(() => {
    console.log("server is working.");
  })
  .catch(error => {
    console.log(`The following error occurred: ${error.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/pizzas", pizzas);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/contact2", function(req, res) {
//   res.render("pizzas/contact2", { title: "ciao", celavemofatta });
// });

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
