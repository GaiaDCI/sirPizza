const mongoose = require('mongoose');
const ingredientsSchema = require('../models/Ingredient');
// // console.log(ingredientsSchema.obj.ingredient.type);
// const ListIngredients = mongoose.model('list', ingredientsSchema);
// console.log(ListIngredients);


// let seeder = require('mongoose-seed');

// // Connect to MongoDB via Mongoose
// seeder.connect('mongodb://localhost:27017/sirPizza', function () {

//     // Load Mongoose models
//     seeder.loadModels([
//         '../models/Ingredients',
//     ]);

//     // Clear specified collections
//     seeder.clearModels(['list'], function () {

//         // Callback to populate DB once collections have been cleared
//         seeder.populateModels(data, function () {
//             seeder.disconnect();
//         });
//     });
// });

// // Data array containing seed data - documents organized by Model
// var data = [
//     {
//         'model': 'list',
//         'documents': [
//             {
//                 'ingredient': 'Tomato'
//             },
//             {
//                 'ingredient': 'Mozzarella'
//             },
//             {
//                 'ingredient': 'Olives'
//             },
//             {
//                 'ingredient': 'Basilisk'
//             },
//             {
//                 'ingredient': 'Parmiggiano'
//             },
//             {
//                 'ingredient': 'Chili'
//             }
//         ]
//     }
// ];