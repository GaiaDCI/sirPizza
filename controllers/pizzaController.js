const mongoose = require("mongoose");

const pizzaSchema = require("../models/Pizza");
const PizzaRecipe = mongoose.model("Pizza", pizzaSchema);
const pizzaController = {};

//search
pizzaController.search = (req, res) => {
  let query = req.query.query;
  console.log(query)
  PizzaRecipe.find({ name: new RegExp(`${query}`)}).exec((error, pizzas) => {

    if (error) {
      console.log("Error:", error);

    } else {
      res.render("../views/pizzas/index", {pizzas: pizzas});
   // console.log(pizzas)
   //   res.json(pizzas)
    }
  });
}

//Pizza home
pizzaController.home = (req, res) => {
  PizzaRecipe.find({}).exec((error, pizzas) => {
    if (error) {
      console.log("Error:", error);
    } else {
      res.render("../views/pizzas/index", { pizzas: pizzas });
    }
  });
};

// pizzaController.list = (req, res) => {
//       res.render("../views/pizzas/index", { pizzasName: pizzas.name });
// };

// pizzaController.contact2 = (req, res) => {
//   res.render("../views/pizzas/contact2");
// };

//CREATE METHOD
pizzaController.create = (req, res) => {
  res.render("../views/pizzas/create");
};

pizzaController.save = (req, res) => {
  let pizza = new PizzaRecipe({
    name: req.body.name,
    expense: req.body.expense,
    ingredients: req.body.ingredients,
    difficulties: req.body.difficulties,
    description: req.body.description
  });
  pizza.save(error => {
    if (error) {
      console.log(error);
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
      res.render("../views/pizzas/show", { pizza: pizza });
    }
  });
};

//EDIT
pizzaController.edit = (req, res) => {
  PizzaRecipe.findOne({ _id: req.params.id }).exec((error, pizza) => {
    if (error) {
      console.log(error);
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
    (error, restaurant) => {
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
