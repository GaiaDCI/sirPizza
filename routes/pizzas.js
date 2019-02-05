const express = require("express");
const router = express.Router();

const pizza = require("../controllers/pizzaController.js");

//Get all restaurants
router.get("/", pizza.home);

router.get("/search", pizza.search);
//Create restaurant
router.get("/create", pizza.create);
//Save restaurant
router.post("/save", pizza.save);
//Get single restaurant by id
router.get("/show/:id", pizza.show);
//Edit restaurant
router.get("/edit/:id", pizza.edit);
//Update restaurant
router.post("/update/:id", pizza.update);
//Delete restaurant
router.post("/delete/:id", pizza.delete);
// router.post("/find/:pizza", pizza.delete);

//contact2
// router.get("/contact2", pizza.contact2);
module.exports = router;
