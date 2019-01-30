const mongoose = require("mongoose");
const pizzaSchema = require("../models/recipeSchema");
const Pizza = mongoose.model("recipeSchema", pizzaSchema);
const allPizzas = {};

//SHOW
allPizzas.list = (req, res) => {
  Pizza.find({}).exec((error, lepizze) => {
    if (error) {
      console.log("You have an error:", error);
    } else {
      res.render("../views/index", { lepizze: lepizze });
    }
  });
};

//READ

//ADD

//EDIT

//DELETE

module.exports = allPizzas;
