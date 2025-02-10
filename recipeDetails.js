const mongoose = require('mongoose');

const recipeDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    ingredients: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const RecipeDetails = mongoose.model('RecipeDetails', recipeDetailsSchema);

module.exports = RecipeDetails;