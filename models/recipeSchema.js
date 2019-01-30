const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: "name", unique: true },
  expense: Number, //total amount of the pizza
  ingredients: String, //or single ingredient like tomato
  difficulties: String, //beginner - average - difficult
  description: String,
  created_at: Date,
  meta: { votes: Number, favs: Number }
});

module.exports = pizzaSchema;
