const express = require("express");
const router = express.Router();

const pizza = require("../controllers/pizzaController.js");

router.get("/", pizza.list);
router.get("/create", pizza.create);
router.post("/save", pizza.save);
router.get("/show/:id", pizza.show);
router.get("/edit/:id", pizza.edit);
router.post("/update/:id", pizza.update);
router.post("/delete/:id", pizza.delete);

//contact2
// router.get("/contact2", pizza.contact2);
module.exports = router;
