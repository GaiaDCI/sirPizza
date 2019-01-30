const express = require("express");
const router = express.Router();

const x = require("../controllers/recipeController.js");

router.get("/", x.list);

module.exports = router;
