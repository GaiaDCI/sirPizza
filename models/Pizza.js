const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "like Margherita"
  },
  expense: {
    type: Number
  },
  ingredients: [{
    type: mongoose.Schema.ObjectId,
    ref: "list"
  }],
  difficulties: {
    type: String
  },
  description: {
    type: String
  },
  image: {}
});

module.exports = pizzaSchema;
