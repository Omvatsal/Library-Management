const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  username:  { type: String, required: true, unique: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },

  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book' 
  }],

  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AuthorProfile' 
  }],

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
