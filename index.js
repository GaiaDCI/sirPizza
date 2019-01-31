const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const allpizza =require("./controllers/recipeController");

const x = require("./routes/pizzaRoutes");

mongoose.connect(
    `mongodb://localhost:27017/pizzadb`,
    { useNewUrlParser: true }
  )
  .then(console.log("database connected"))
  .catch(error => {
    console.log(`YOU HAVE AN ERROR ${error.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", x);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/list',function(req,res){



 res.send(allpizza);


});


app.listen(3001, () => {
  console.log("server is running on port 3001");
});
