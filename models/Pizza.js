const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "like Margherita"
  },
  expense: {
    type: String
  },
  ingredients: {
    type: String
  },
  difficulties: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = pizzaSchema;
