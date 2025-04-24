import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../footer";
import Card from "../card1";
import NavbarWrapper from "../nav";

export default function Book() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchBooks = async () => {
      setBooks([]);
      setError("");
      setLoading(true); // Set loading to true when starting to fetch

      try {
        let res;
        if (!query) {
          res = await fetch("http://localhost:8000/books");
        } else {
          res = await fetch(`http://localhost:8000/books/search?query=${query}`);
        }

        console.log('Response Status:', res.status);
        console.log('Response OK:', res.ok);

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
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="bg-gray-300 w-full min-h-screen overflow-x-clip scroll-smooth">
      <NavbarWrapper />
        <section className="min-h-screen">
      <div className="text-5xl px-4 sm:px-16 pt-16 text-center font-poppins tracking-tight mb-4">
        {query ? `Results for "${query}"` : "Find Your Next Favorite Read."}
      </div>

      <div className="text-center w-[100px] sm:w-[9%] border-[1.5px] rounded-b-full mx-auto mb-6 border-gray-400"></div>

      <div className="px-4 sm:px-16 text-center mb-10 text-lg text-gray-700">
        {query
          ? `Showing books related to "${query}". `
          : "Curated reads to match your mood, your chaos, and your late-night overthinking."}
      </div>

      {error && <p className="text-red-600 text-center text-lg">{error}</p>}

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-600 text-lg">Loading books...</div>
      )}

<div className="flex justify-center md:ml-52 w-full">
  <div className="flex flex-wrap justify-center gap-8 w-full px-4">
    {books.length > 0 ? (
      books.map((book, index) => (
        <div
          key={index}
          className="w-full  cursor-pointer"
          onClick={() => navigate(`/books/${book._id}`)}
        >
          <Card
            link={book.coverImage}
            title={book.title}
            author={book.author}
            pages={book.pages}
            genre={book.genre}
            onReadMore={() => navigate(`/books/${book._id}`)}
          />
        </div>
      ))
    ) : !loading && !error ? (
      <p className="text-center text-gray-500 text-lg">No books available.</p>
    ) : null}
  </div>
</div>
</section>
      <Footer />
    </div>
  );
}
