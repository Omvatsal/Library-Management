import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookCard = ({ genre, excludeId  }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:8000/books/search?query=${genre}`);
        if (res.status === 200) {
          const data = await res.json();
          setBooks(data);
        } else if (res.status === 404) {
          setError("No books found.");
        } else {
          setError("Something went wrong while fetching books.");
        }
      } catch (err) {
        setError("Error in fetching data: " + err.message);
      }
    };

    if (genre) fetchBooks();
  }, [genre]);

  useEffect(() => {
    const checkScrollability = () => {
      const el = scrollRef.current;
      if (el) {
        setShowArrows(el.scrollWidth > el.clientWidth);
      }
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [books]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const filteredBooks = books.filter(book => book._id !== excludeId);

  if (filteredBooks.length === 0) {
    return <p className="text-gray-600 mx-8">No other books found in this genre.</p>;
  }

  return (
    <div className="relative w-full">
      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Card container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-4 px-8 py-4 scroll-smooth"
      >
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl cursor-pointer hover:scale-95 transition-all overflow-hidden w-[14vw] mx-4 flex-shrink-0"
            onClick={() => window.location.href = `/books/${book._id}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/books/${book._id}`;
              }
            }}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
