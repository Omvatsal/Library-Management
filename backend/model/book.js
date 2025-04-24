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

  rentedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  rentCount: {
    type: Number,
    default: 0
  },

  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    review: {
      type: String,
      required: true,
      trim: true
    }
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;
