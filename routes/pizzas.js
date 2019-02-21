const express = require("express");
const router = express.Router();

const pizza = require("../controllers/pizzaController.js");
const upload = require("../handler/multer");

router.get("/", pizza.home);

router.get("/list", pizza.list);

router.get("/search", pizza.search);

router.get("/create", pizza.create);

router.post("/save", upload.single("picturePizza"), pizza.save);

router.get("/show/:id", pizza.show);

router.get("/edit/:id", pizza.edit);

router.post("/update/:id", pizza.update);

router.post("/delete/:id", pizza.delete);

module.exports = router;
