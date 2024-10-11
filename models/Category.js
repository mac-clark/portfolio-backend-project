// models/Category.js
const mongoose = require('mongoose');

// Schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);