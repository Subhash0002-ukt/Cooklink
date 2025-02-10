const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

module.exports = app;