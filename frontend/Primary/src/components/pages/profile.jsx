import React, { useEffect, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";
import Card from "../card2";
import NavbarWrapper from "../nav";

export default function Profile() {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showRAll, setShowRAll] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Add this to persist profile image between renders
  const [cachedProfileImage, setCachedProfileImage] = useState(() => {
    // Try to get from localStorage on initial render
    return localStorage.getItem("profileImage") || null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage"); // Clear cached profile image
    window.location.reload();
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await fetch("http://localhost:8000/dashboard", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("Image uploaded successfully:", data);

      // Update both state and localStorage
      setUser((prev) => ({ ...prev, profileImage: data.avatar }));
      setCachedProfileImage(data.avatar);
      localStorage.setItem("profileImage", data.avatar);
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setShowImageUpload(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
            return;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);
        setBooks(data.books);

        // Update cached profile image if available from server
        if (data.avatar) {
          setCachedProfileImage(data.avatar);
          localStorage.setItem("profileImage", data.avatar);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!localStorage.getItem("token")) {
    return <RedirectToHome />;
  }

  // Display loading state more elegantly
  if (isLoading && !cachedProfileImage) {
    return (
      <div className="w-full h-screen bg-gray-300 flex justify-center items-center">
        <NavbarWrapper />
        <div className="text-2xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-gray-300">
      <NavbarWrapper />

      <div className=" w-full h-auto p-4 sm:p-8 pt-16 flex flex-col items-center">
        {/* Profile Section */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex flex-row items-center gap-4">
            {/* Use cached profile image if available during loading */}
            {cachedProfileImage || user?.profileImage ? (
              <img
                src={cachedProfileImage || user?.profileImage}
                alt="Profile"
                className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full cursor-pointer"
                onClick={() => setShowImageUpload(true)}
              />
            ) : (
              <PiUserCircleThin
                className="w-28 h-28 sm:w-36 sm:h-36 opacity-80 cursor-pointer rounded-full"
                onClick={() => setShowImageUpload(true)}
              />
            )}
            <div>
              <div className="text-2xl sm:text-3xl font-poppins font-bold">
                Hi, {user?.firstName}
              </div>
              <div className="text-black/50">{user?.email}</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-white hover:bg-gray-200 transition-all duration-300 shadow-md font-semibold border cursor-pointer rounded-2xl py-2 px-4 border-black"
              onClick={() => {
                navigate("/profile/change");
              }}
            >
              Change Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-md text-white font-semibold border cursor-pointer rounded-2xl py-2 px-4 border-black"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Books Rented */}
          <div id="Library" className="text-black p-6 sm:p-8 shadow-lg shadow-black/40 rounded-4xl	bg-gray-400">
            <div className="text-2xl font-poppins font-bold mb-4">
              My Library
            </div>
            <div className="flex flex-wrap items-start justify-start gap-6">
              {isLoading ? (
                <p className="text-center">Loading books...</p>
              ) : books.length > 0 ? (
                <>
                  {books.slice(0, 3).map((book, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-[80%] transition-transform duration-300 hover:scale-[1.02]"
                      onClick={() => navigate(`/books/${book._id}`)}
                    >
                      <Card
                        link={book.coverImage}
                        title={book.title}
                        onReadMore={() => navigate(`/books/${book._id}`)}
                      />
                    </div>
                  ))}
                  {books.length > 3 && (
                    <div className="w-full flex justify-center">
                      <button
                        className="px-6 py-2 bg-[#f00b9c] cursor-pointer text-white rounded-lg transition-all duration-300 hover:bg-[#d40989]"
                        onClick={() => {
                          setShowAll(true), setShowRAll(false);
                        }}
                      >
                        View more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic">No books rented.</p>
              )}
            </div>
          </div>

          {/* User Reviews  bg-[#f7e3d7]  */}
          <div className="p-6 bg-gray-400 shadow-black/40 rounded-4xl shadow-lg">
            <div className="font-bold text-2xl font-poppins mb-4">
              Your Reviews
            </div>
            <div className="flex flex-col gap-4">
              {user?.reviews?.length > 0 ? (
                <>
                  {user.reviews.slice(0, 4).map((rev, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-xl bg-[#f8e3ee] cursor-pointer shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                      onClick={() => navigate(`/books/${rev.book?._id}`)}
                    >
                      <div className="text-lg font-semibold">
                        {rev.book?.title || "Book Title"}
                      </div>
                      <div className="text-sm text-gray-600 italic mb-1">
                        {rev.book?.author && `by ${rev.book.author}`}
                      </div>
                      <p className="text-gray-800">{rev.review}</p>
                    </div>
                  ))}

                  {user.reviews.length > 4 && (
                    <div className="w-full flex justify-center">
                      <button
                        className="mt-4 px-6 py-2 bg-[#f00b9c] cursor-pointer text-white rounded-lg transition-all duration-300 hover:bg-[#d40989]"
                        onClick={() => {
                          setShowRAll(true), setShowAll(false);
                        }}
                      >
                        View more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic">
                  You haven't added any reviews yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {showAll && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowAll(false)}
          />
          <div className="fixed top-0 right-0 w-full sm:w-[80%] md:w-[50%] lg:w-[40%] h-full bg-[#f7e3d7] shadow-xl z-50 p-6 overflow-y-auto animate-fade-slide transition-transform duration-500">
            <div className="flex justify-between mb-4">
              <div className="font-bold text-2xl font-poppins mb-4">
                Books Rented
              </div>
              <FaTimes
                size={24}
                color="gray"
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={() => {
                  setShowAll(false);
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              {books.map((book, index) => (
                <div key={index} onClick={() => navigate(`/books/${book._id}`)}>
                  <Card
                    link={book.coverImage}
                    title={book.title}
                    onReadMore={() => navigate(`/books/${book._id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* review sidebar */}
      {showRAll && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowRAll(false)}
          />
          <div className="fixed top-0 left-0 w-full sm:w-[80%] md:w-[50%] lg:w-[40%] h-full bg-[#f7e3d7] shadow-xl z-50 p-6 overflow-y-auto animate-fade-slide2 transition-transform duration-500">
            <div className="flex justify-between mb-4">
              <div className="font-bold text-2xl font-poppins mb-4">
                Your Reviews
              </div>
              <FaTimes
                size={24}
                color="gray"
                className="cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={() => {
                  setShowRAll(false);
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              {user.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-xl bg-[#f8e3ee] cursor-pointer shadow-sm transition-transform duration-300 hover:scale-[1.01]"
                  onClick={() => navigate(`/books/${rev.book?._id}`)}
                >
                  <div className="text-lg font-semibold">
                    {rev.book?.title || "Book Title"}
                  </div>
                  <div className="text-sm text-gray-600 italic mb-1">
                    {rev.book?.author && `by ${rev.book.author}`}
                  </div>
                  <p className="text-gray-800">{rev.review}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* image upload */}
      {showImageUpload && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setShowImageUpload(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md transition-all duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Profile Picture
              </h2>
              <FaTimes
                size={22}
                className="cursor-pointer text-gray-500 hover:text-gray-800 transition"
                onClick={() => setShowImageUpload(false)}
              />
            </div>

            {/* File Input */}
            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">
                Choose an image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-pink-500 file:text-white
                    hover:file:bg-pink-600 cursor-pointer"
              />
            </label>

            {/* Preview */}
            {selectedImage && (
              <div className="flex justify-center mb-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-pink-400 shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            {/* Upload Button */}
            <button
              className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-medium py-2.5 rounded-lg hover:from-pink-600 hover:to-fuchsia-700 shadow-lg transition-all"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

function RedirectToHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
}
