// This file defines Mongoose models for the MongoDB database, exporting schemas for data management.

const mongoose = require('mongoose');

// Example User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Example Product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
}, { timestamps: true });

// Exporting the models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = {
    User,
    Product,
};