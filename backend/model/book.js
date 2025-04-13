const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  author: {
    type: String,
    required: true,
    trim: true
  },

  pages: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    trim: true
  },

  genre: {
    type: String,
    required: true,
    trim: true
  },

  coverImage: {
    type: String,
    default: ''
  },

  pdfLink: {
    type: String,
    default: '',
    trim: true
  },

  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  rentCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
