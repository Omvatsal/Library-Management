import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authcontext";
import Logo from "../logo";

export default function SignUp() {
  const [[error1, error2], setError] = useState(["", ""]);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });

    if (e.target.id === "confirmPassword" || e.target.id === "password") {
      setError(["", error2]);
    }
  };

  const validateForm = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError(["Passwords do not match.", error2]);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        setUser(decoded);
        navigate("/");
      } else if (response.status === 409) {
        setError([error1, "Username already taken"]);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center bg-[url('/back.jpg')] relative">
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/30 z-0" /> */}

      {/* Grid container */}
      <div className="grid grid-cols-2 w-full max-w-6xl z-10 rounded-xl shadow-2xl overflow-hidden">
        {/* Left Column (Logo + Info) */}
        <div className="flex flex-col justify-center items-center bg-[#F0EADC] p-10">
          <Logo
            className1="text-5xl mb-6 text-gray-800"
            className2="text-7xl text-gray-800"
          />
          <p className="text-lg text-gray-700 text-center max-w-sm mt-4">
            Join our community to borrow, track and manage your books effortlessly!
          </p>
        </div>

        {/* Right Column (Form) */}
        <div className="bg-white p-10">
          <form onSubmit={validateForm} className="space-y-6">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Create Your Account
            </h2>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="secondName" className="block text-gray-700 mb-1">
                  Second Name
                </label>
                <input
                  type="text"
                  id="secondName"
                  value={form.secondName}
                  onChange={handleChange}
                  placeholder="Second name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </div>

            {/* Other Fields */}
            {[
              { id: "email", label: "Email", placeholder: "Enter your email", type: "email" },
              { id: "username", label: "Username", placeholder: "Choose a username", type: "text" },
              { id: "password", label: "Password", placeholder: "Create a password", type: "password" },
              { id: "confirmPassword", label: "Confirm Password", placeholder: "Confirm your password", type: "password" },
            ].map(({ id, label, placeholder, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  value={form[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
                {(id === "confirmPassword") && error1 && (
                  <p className="text-red-500 text-sm mt-1">{error1}</p>
                )}
                {(id === "username") && error2 && (
                  <p className="text-red-500 text-sm mt-1">{error2}</p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white rounded-lg text-lg font-semibold transition duration-300 hover:scale-105"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
