import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarWrapper from "../nav";
import Footer from "../footer";
import Rent from "../rent.jsx";
import { useAuth } from "../../Authcontext.jsx";
import { FaPaperPlane, FaPen, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import BookCard from "../bookcard.jsx";

export default function BookId() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [userReview, setUserReview] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await fetch(`http://localhost:8000/books/${bookId}`);
        const bookData = await bookRes.json();
        setBook(bookData);

        const userExistingReview = bookData.reviews.find(
          (r) => r.user?._id === userId
        );
        setUserReview(userExistingReview || null);

        if (!userExistingReview) {
          setReviewText(""); // new user, fresh text
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching book or user");
      }
    };
    fetchData();
  }, [bookId, userId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      alert("Please enter a valid review");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8000/books?bookId=${bookId}&userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review: reviewText }),
        }
      );

      const data = await res.json();

      if (data.review) {
        setBook(data.book);
        setUserReview(data.review);
        setReviewText("");
      } else {
        console.error("Review update failed: no review found in response.");
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/books?bookId=${bookId}&userId=${userId}&reviewId=${reviewId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success || data.book) {
        setBook(data.book);

        if (editingReviewId === reviewId) {
          setEditingReviewId(null);
          setEditText("");
        }
      } else {
        console.error(
          "Failed to delete review:",
          data.message || "Unknown error"
        );
      }
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  const handleReviewEdit = (review) => {
    setEditingReviewId(review._id);
    setEditText(review.review);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditText("");
  };

  const saveEditedReview = async (reviewId) => {
    if (!editText.trim()) {
      alert("Please enter a valid review");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/books?bookId=${bookId}&userId=${userId}&reviewId=${reviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review: editText }),
        }
      );

      const data = await res.json();

      if (data.review || data.book) {
        setBook(data.book);
        if (data.review) setUserReview(data.review);
        setEditingReviewId(null);
        setEditText("");
      } else {
        console.error("Review update failed: no review found in response.");
      }
    } catch (err) {
      console.error("Failed to update review", err);
    }
  };

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!book) return <p className="p-4">Loading book...</p>;

  return (
    <div>
      <NavbarWrapper />
      <div className=" bg-[#F0EADC] w-full h-auto p-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] justify-center items-center gap-4">
          <img
            src={book.coverImage}
            alt="Book Cover"
            className="md:h-[320px] h-[260px] mx-auto mb-4 w-auto rounded-lg shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="md:text-5xl text-2xl font-poppins font-bold mb-2">
              {book.title}
            </h1>
            <h2 className="md:text-[36px] text-xl font-semibold mb-2">
              {book.author}
            </h2>
            <p className="text-xl md:text-[15px]">Genre: {book.genre}</p>
            <p className="text-xl md:text-[15px]">Pages: {book.pages}</p>
            <Rent />
          </div>
        </div>

        <div className="mt-8 ml-8 font-bold mb-2 text-4xl">Description</div>
        <div className="whitespace-pre-line ml-8">{book.description}</div>

        {/* Review Section */}
        {user && (
          <div className="mt-8 ml-8">
            <div className="text-3xl font-poppins font-semibold mb-4">
              Reviews
            </div>

            {!editingReviewId && (
              <form onSubmit={handleReviewSubmit} className="mb-4">
                <div className="relative">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Add your review..."
                    rows="1"
                    className="w-full block mx-auto p-4 border rounded-4xl overflow-y-auto scrollbar-hide mb-2 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-6 hover:scale-105 transition-all cursor-pointer top-1/2 transform -translate-y-1/2 text-2xl text-[#f00b9c]"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            )}

            {/* Review List with Show More */}
            <div className="space-y-4">
              {book.reviews && book.reviews.length > 0 ? (
                <>
                  {(showAllReviews
                    ? book.reviews
                    : book.reviews.slice(0, 2)
                  ).map((rev) => (
                    <div
                      key={rev._id}
                      className="border px-4 py-2 rounded-lg bg-[#f8e3ee] shadow-sm"
                    >
                      <div className="font-semibold">
                        {rev.user?.firstName || "User"}:
                      </div>

                      {editingReviewId === rev._id ? (
                        <div className="mt-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                            rows="3"
                            autoFocus
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => saveEditedReview(rev._id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
                            >
                              <FaSave className="mr-1" /> Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 flex items-center"
                            >
                              <FaTimes className="mr-1" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-700">{rev.review}</p>
                          {rev.user?._id === userId && (
                            <div className="flex justify-end space-x-3 mt-2">
                              <button
                                onClick={() => handleReviewEdit(rev)}
                                className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-all cursor-pointer"
                                aria-label="Edit review"
                              >
                                <FaPen />
                              </button>
                              <button
                                onClick={() => handleReviewDelete(rev._id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full hover:scale-110 transition-all cursor-pointer text-lg"
                                aria-label="Delete review"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}

                  {/* Show More / Less Toggle */}
                  {book.reviews.length > 2 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="text-white rounded-2xl cursor-pointer px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-700 font-medium"
                      >
                        {showAllReviews
                          ? "Show Less"
                          : `Show ${book.reviews.length - 2} More`}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p>No reviews yet. Be the first to add one!</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 ml-8 text-2xl font-poppins font-semibold mb-4">
          Books of the same genre
        </div>
        <BookCard genre={book.genre} excludeId={book._id} />
      </div>
      <Footer />
    </div>
  );
}
