// mern-backend/backend/src/controllers/recipeController.js
const RecipeDetails = require('../models/recipeDetails');
const path = require('path');
const fs = require('fs');

exports.createRecipe = async (req, res) => {
    try {
        const recipe = new RecipeDetails(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipeDetails.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await RecipeDetails.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await RecipeDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await RecipeDetails.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.uploadRecipe = async (req, res) => {
    try {
        const { title, description, prepTime, cookTime, totalTime, note, ingredients } = req.body;
        const image = req.file ? req.file.filename : null;

        const recipe = new RecipeDetails({
            title,
            image,
            description,
            prepTime,
            cookTime,
            totalTime,
            note,
            ingredients
        });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error uploading recipe:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.searchRecipes = async (req, res) => {
    try {
        const query = req.query.query;
        const recipes = await RecipeDetails.find({ title: new RegExp(query, 'i') });
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ error: error.message });
    }
};