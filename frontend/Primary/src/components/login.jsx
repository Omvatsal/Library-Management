import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../Authcontext"
import Logo from "./logo";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError]=useState("");
  
    const navigate = useNavigate();
    const {setUser}=useAuth();
  
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
          const decoded = JSON.parse(atob(data.token.split('.')[1]));
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
          alert(data.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Error during login:", err);
        alert("Failed to connect to server.");
      }
    };
  
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[url('/back.jpg')] bg-contain bg-center  relative ">
        <div className="bg-white p-10 rounded-xl shadow-lg w-[40rem] h-[25rem] text-center backdrop-blur-lg relative">
        <Logo className1="text-3xl mb-8"/>
          <form onSubmit={handleSubmit} className="text-left">
            <label className="text-black text-sm font-light" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="w-full p-3 mb-4 rounded bg-white/50 text-black placeholder-gray-700 placeholder-opacity-50 focus:outline-none focus:placeholder-transparent"
              placeholder="Enter your username"
              required
            />
  
            <label className="text-black text-sm font-light" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full p-3 pr-12 rounded bg-white/50 text-black placeholder-gray-700 placeholder-opacity-50 focus:outline-none focus:placeholder-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black opacity-70 hover:opacity-100"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
  
            <button
              type="submit"
              className="w-full p-3 mt-4 bg-gray-500 hover:bg-gray-300 text-black rounded cursor-pointer text-lg transition hover:bg-opacity-40"
            >
              Login
            </button>
            <p className="text-red-500 text-xs">{error}</p>
          </form>
          <div className="text-xs text-center mt-4">
            New user?{" "}
            <Link className="decoration-blue-700 text-blue-700 underline " to="/signin">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
