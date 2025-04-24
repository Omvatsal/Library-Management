import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Authcontext.jsx";
import { FaShoppingCart } from "react-icons/fa";

export default function Rent() {
  const [rent, setRent] = useState("");
  const [error, setError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/").pop();

  const handleClick = async () => {
    setRent("");
    setError("");

    if (!user) {
      navigate("/login");
      return;
    } else {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:8000/books/rent/${bookId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
            }),
          }
        );

        if (response.ok) {
          // const responseData = await response.json();
          setRent("Book rented successfully.");
          setTimeout(() => setRent(""), 4000); 
          setShowCart(true);
          setTimeout(() => setShowCart(false), 2000);
        } else {
          const responseData = await response.json();
          setError(`${responseData.message || "Unknown error"}`);
          setTimeout(() => setError(""), 4000);
        }
      } catch (err) {
        console.error("Error renting book:", err);
        setError("An error occurred while processing your request.");
        setTimeout(() => setError(""), 4000);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 
             text-white font-medium hover:text-white hover:scale-105 
             transition-all duration-300 cursor-pointer 
             lg:w-[16vw] md:w-[15vw] w-[28vw] px-4 py-2 rounded-lg mt-4 shadow-md "
      >
        Rent Book
         {/* {showCart && (
        <span className="absolute left-40 top-1/2 w-[2vw] transform -translate-y-1/2 animate-slideInsideButton">
          <FaShoppingCart className="text-white text-lg" />
        </span>
      )} */}
      </button>
      {rent && <p className="text-green-500">{rent}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
