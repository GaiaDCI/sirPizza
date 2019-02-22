const mongoose = require("mongoose");

// Pizza Model
const pizzaSchema = require("../models/Pizza");
const PizzaRecipe = mongoose.model("Pizza", pizzaSchema);
const pizzaController = {};

// Ingredients Model
const ingredientSchema = require("../models/Ingredient");
const Ingredients = mongoose.model("Ingredient", ingredientSchema);

require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//search
pizzaController.search = (req, res) => {
  let query = req.query.query;
  console.log(query);
  PizzaRecipe.find({ name: new RegExp(`${query}`) }).exec((error, pizzas) => {
    if (error) {
      console.log("Error:", error);
    } else {
      if (pizzas.length < 1) {
        PizzaRecipe.find({}).exec((error, pizzas) => {
          if (error) {
            console.log("Error:", error);
          } else {
            res.render("../views/pizzas/list", {
              pizzas: pizzas,
              notFound: true,
              message: "Pizza Not  Found"
            });
          }
        });
      } else {
        res.render("../views/pizzas/list", {
          pizzas: pizzas,
          notFound: false,
          message: "result : "
        });
      }
    }
  });
};

//Pizza home
pizzaController.home = (req, res) => {
  PizzaRecipe.find({}).exec((error, pizzas) => {
    if (error) {
      console.log("Error:", error);
    } else {
      res.render("../views/index", { pizzas: pizzas });
    }
  });
};

//LIST ALL
pizzaController.list = (req, res) => {
  PizzaRecipe.find({})
    .populate("ingredient")
    .exec((error, pizzas) => {
      if (error) {
        console.log("Error:", error);
      } else {
        res.render("../views/pizzas/list", { pizzas: pizzas, notFound: false });
      }
    });
};

//CREATE METHOD
pizzaController.create = (req, res) => {
  Ingredients.find({}).exec((error, ingredients) => {
    if (error) {
      console.log("Error:", error);
    } else {
      res.render("../views/pizzas/create", { ingredients: ingredients });
    }
  });
};

pizzaController.save = async (req, res) => {
  console.log(req.body);
  //upload to cloudinary
  // console.log(req.file);
  const cloudUpload = await cloudinary.v2.uploader.upload(req.file.path);
  // console.log(cloudUpload);
  let pizza = new PizzaRecipe({
    name: req.body.name,
    expense: req.body.expense,
    ingredients: req.body.ingredients,
    difficulties: req.body.difficulties,
    description: req.body.description,
    image: cloudUpload.url
  });
  console.log(req.body.ingredient);
  let ids = req.body.ingredient;
  if (Array.isArray(ids)) {
    ids.forEach(function(id) {
      mongoose.Types.ObjectId(id);
      pizza.ingredient.push(id);
    });
  } else {
    pizza.ingredient.push(ids);
  }

  pizza.save(error => {
    if (error) {
      console.log("Something went wrong when saving: ", error);
      res.render("pizzas/create");
    } else {
      console.log("oh yeah! You created your pizza.");
      res.redirect(`/pizzas/show/${pizza._id}`);
    }
  });
};

//SHOW METHOD
pizzaController.show = (req, res) => {
  PizzaRecipe.findOne({ _id: req.params.id }).exec((error, pizza) => {
    if (error) {
      console.log("Error:", error);
    } else {
      Ingredients.find({ _id: { $in: pizza["ingredients_ids"] } }).exec(
        (error, ingredients) => {
          if (error) {
            res.render("../views/pizzas/show", {
              pizza: pizza,
              ingredients: {}
            });
          } else {
            res.render("../views/pizzas/show", {
              pizza: pizza,
              ingredients: ingredients
            });
          }
        }
      );
    }
  });
};

//EDIT
pizzaController.edit = (req, res) => {
  PizzaRecipe.findOne({ _id: req.params.id }).exec((error, pizza) => {
    if (error) {
      console.log("YOU HAVE AN ERROR:", error);
    } else {
      res.render("../views/pizzas/edit", { pizza: pizza });
    }
  });
};

//UPDATE
pizzaController.update = (req, res) => {
  PizzaRecipe.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        rating: req.body.rating,
        open: req.body.open
      }
    },
    { new: true },
    (error, pizza) => {
      if (error) {
        console.log(error);
        res.render("../views/pizzas/edit", { pizza: req.body });
      } else {
        res.redirect(`/pizzas/show/${pizza._id}`);
      }
    }
  );
};

//DELETE
pizzaController.delete = (req, res) => {
  PizzaRecipe.remove({ _id: req.params.id }, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("This Pizza´s recipe has been deleted!!! ");
      res.redirect("/");
    }
  });
};

module.exports = pizzaController;
