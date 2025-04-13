import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext";
import Logo from "./logo"; 

export default function SignUp() {
    const [error, setError] = useState("");
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
        setError("");
      }
  };

  const validateForm =async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    console.log("Form submitted", form);

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
          localStorage.setItem('token',data.token);
          const decoded = JSON.parse(atob(data.token.split('.')[1]));
          setUser(decoded); 
          navigate("/"); 
        } 
        else if(response.status===409){
            setError("username already taken");
        }
        else {
          alert(data.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Error during sign up:", err);
        alert("Failed to connect to server.");
      }
    };


  return (
    <div className="min-h-screen w-full flex items-center justify-center" >
       <div className="absolute inset-0 bg-[url('/back.jpg')] bg-conatin bg-center opacity-70 -z-10" />
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-2xl  shadow-gray-900">
      <Logo className1="text-4xl mb-8 text-center"/>
        <form onSubmit={validateForm} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="first name"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="secondName" className="block text-gray-700 mb-1">Second Name</label>
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

          {[
            { id: "email", label: "Email", placeholder: "Enter your email", type: "email" },
            { id: "username", label: "Username", placeholder: "Choose a username", type: "text" },
            { id: "password", label: "Password", placeholder: "Create a password", type: "password" },
            { id: "confirmPassword", label: "Confirm Password", placeholder: "Confirm your password", type: "password" },
          ].map(({ id, label, placeholder, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                id={id}
                value={form[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
                 {(id === "confirmPassword" || id==="username") && error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 cursor-pointer transition duration-300 font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
