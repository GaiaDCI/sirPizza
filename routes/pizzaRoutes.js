const express = require("express");
const router = express.Router();

const x = require("../controllers/recipeController.js");

//Get all pizza
router.get("/", x.list);

module.exports = router;
