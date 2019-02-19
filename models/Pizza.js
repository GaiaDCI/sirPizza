const mongoose = require("mongoose");
require('./Ingredient')

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expense: {
    type: Number
  },

  ingredient: [{ type: mongoose.Schema.ObjectId, ref: 'Ingredient' }],

  difficulties: {
    type: String
  },
  description: {
    type: String
  },
  image: {}
});

module.exports = pizzaSchema;
