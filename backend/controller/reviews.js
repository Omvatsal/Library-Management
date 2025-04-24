const mongoose = require('mongoose');
const Book = require('../model/book');
const User = require('../model/user'); // Import the User model


// Handle adding or updating a review
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};


const handleupdate = async (req, res) => {
  const { bookId, userId, reviewId } = req.query;
  const { review } = req.body;

  if (!isValidObjectId(bookId) || !isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  try {
    const book = await Book.findById(bookId).populate('reviews.user');
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(404).json({ error: "User or Book not found" });
    }

    let updated = false;

    if (reviewId && isValidObjectId(reviewId)) {
      // 🔁 Try to update existing review
      const bookReview = book.reviews.find(
        (r) => r._id.toString() === reviewId && r.user?._id.toString() === userId
      );
      const userReview = user.reviews.find(
        (r) => r._id.toString() === reviewId && r.book.toString() === bookId
      );

      if (bookReview) {
        bookReview.review = review;
        updated = true;
      }

      if (userReview) {
        userReview.review = review;
        updated = true;
      }
    }

    if (!updated) {
      // ➕ Add new review with shared _id
      const sharedReviewId = new mongoose.Types.ObjectId();

      const newBookReview = {
        _id: sharedReviewId,
        user: userId,
        review,
      };

      const newUserReview = {
        _id: sharedReviewId,
        book: bookId,
        review,
      };

      book.reviews.push(newBookReview);
      user.reviews.push(newUserReview);
    }

    await book.save();
    await user.save();

    const updatedBook = await Book.findById(bookId).populate('reviews.user', 'firstName lastName');

    res.status(200).json({
      message: updated ? "Review updated successfully" : "Review added successfully",
      book: updatedBook,
      review: updatedBook.reviews.find(r => r.user._id.toString() === userId)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Handle deleting a specific review
const handledelete = async (req, res) => {
  const { bookId, userId, reviewId } = req.query; // Add reviewId from query parameters
  
  try {
    const book = await Book.findById(bookId).populate('reviews.user');
    const user = await User.findById(userId);
    
    if (!book || !user) {
      return res.status(404).json({ error: "User or Book not found" });
    }
    
    // Only remove the specific review matching both user and review ID
    if (reviewId) {
      // Remove the specific review from the book
      book.reviews = book.reviews.filter(r => 
        !(r._id.toString() === reviewId && r.user._id.toString() === userId)
      );
      
      // Remove the specific review from the user
      user.reviews = user.reviews.filter(r => 
        !(r._id.toString() === reviewId && r.book.toString() === bookId)
      );
    } else {
      // Fall back to previous behavior if no reviewId provided
      book.reviews = book.reviews.filter(r => 
        !(r._id.toString() === reviewId && r.user?._id.toString() === userId)
      );
      user.reviews = user.reviews.filter(r => r.book.toString() !== bookId);
    }
    
    await book.save();
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      book: book, // Return the full updated book data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleupdate, handledelete };
