const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expense: {
    type: Number
  },
  ingredients_ids: [],
  difficulties: {
    type: String
  },
  description: {
    type: String
  },
  image: {}
});

module.exports = pizzaSchema;
