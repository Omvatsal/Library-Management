const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },

  avatar: { 
    type: String, 
    trim: true 
  },

  avatarPublicId: { type: String },

  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'book' 
  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthorProfile' 
  }],

  reviews: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
      },
      review: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
