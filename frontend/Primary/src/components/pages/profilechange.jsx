import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../logo";

export default function ChangeProfile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("Error:", err);
        setError("Could not load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/dashboard/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  return (
<div className="min-h-screen bg-[#f7e3d7] flex items-center justify-center">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl flex flex-wrap">

    {/* Left Column: Profile Form */}
    <div className="flex-1 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 font-poppins">
        Edit Profile
      </h2>

      {error && (
        <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
      )}

      <div className="flex flex-col space-y-4">
        {[{ label: "First Name", name: "firstName", editable: true },
          { label: "Last Name", name: "lastName", editable: true },
          { label: "Username", name: "username", editable: false },
          { label: "Email", name: "email", editable: false }]
          .map(({ label, name, editable }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium">
                {label}
              </label>
              <input
                type={name === "email" ? "email" : "text"}
                id={name}
                name={name}
                value={userData[name]}
                onChange={editable ? handleChange : undefined}
                disabled={!editable}
                className={`w-full border-2 border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-pink-500 transition-all duration-300 ease-in-out ${
                  editable ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        
        <button
          onClick={handleSubmit}
          className="mt-4 bg-pink-500 cursor-pointer hover:bg-pink-600 text-white font-medium py-2.5 rounded-full transition-all duration-300 ease-in-out"
        >
          Save Changes
        </button>
      </div>
    </div>

    {/* Right Column: Bookshelf and New User Option */}
    <div className="flex-1 relative bg-[#F0EADC] p-8 flex justify-center items-center rounded-lg shadow-lg">
      <FaTimes
        className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-black"
        onClick={() => navigate("/dashboard")}
      />
      <Logo
        className1="text-5xl mb-6 text-center text-gray-800"
        className2="text-7xl text-gray-800"
      />
    </div>

  </div>
</div>

  );
}
