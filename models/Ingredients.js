const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    ingredient: { type: String }
});

module.exports = ingredientsSchema;