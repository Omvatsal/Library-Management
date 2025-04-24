import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authcontext";
import Logo from "../logo";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Login form submitted", form);

    try {
      const response = await fetch("http://localhost:8000/login", {
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
        console.log("user found");
      } else {
        if (response.status === 404) {
          setError("User not found. Please create an account.");
          navigate("/signin");
        } else if (response.status === 401) {
          setError("Incorrect password. Try again.");
        } else if (response.ok) {
          navigate("/");
          console.log("Login successful");
        } else {
          setError("Something went wrong.");
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center bg-[url('/back.jpg')]">
      {/* Outer Container */}
      <div className="grid grid-cols-2 w-full max-w-[58rem]  rounded-xl bg-white shadow-lg">
        {/* Left Column  */}
        <div className="flex flex-col justify-center items-center  bg-[#F0EADC] p-8 rounded-lg rounded-br-4xl rounded-tr-4xl">
          <Logo
            className1="text-5xl mb-8 text-gray-800"
            className2="text-7xl text-gray-800"
          />
           <div className="text-gray-800 text-lg font-semibold mb-4">
            Welcome Back!
          </div>
          {/* Register Link */}
          <div className="text-gray-800 text-sm text-center mt-5">
            New user?{" "}
            <Link
              to="/signin"
              className="text-blue-500 underline hover:text-blue-400"
            >
              Create an account
            </Link>
          </div>
        </div>
        {/* Right Column (Form) */}
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="text-left w-full max-w-sm">
            {/* Username Field */}
            <label
              className="text-gray-800 text-sm font-semibold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="w-full mt-2 p-3 mb-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />

            {/* Password Field */}
            <label
              className="text-gray-800 text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full mt-2 p-3 pr-12 mb-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-800 opacity-70 hover:opacity-100"
              >
                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-gradient-to-r cursor-pointer from-blue-400 to-fuchsia-500 hover:from-blue-500 hover:to-pink-500 text-white rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
            {/* <div className="text-gray-800 text-sm text-center mt-4">
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 underline hover:text-blue-400"
              >
                Reset it here
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
