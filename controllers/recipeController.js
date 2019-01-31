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
      console.log(lepizze);
      res.render("../views/index", { "frontendValue": lepizze });
    }
  });
};

//READ

//ADD

//EDIT

//DELETE

module.exports = allPizzas;
