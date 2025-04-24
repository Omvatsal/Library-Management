import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract token from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Your password has been successfully reset.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center bg-[url('/back.jpg')]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="text-left">
          {/* New Password Field */}
          <label className="text-gray-800 text-sm font-semibold" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-2 p-3 mb-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your new password"
            required
          />

          {/* Confirm Password Field */}
          <label className="text-gray-800 text-sm font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 p-3 mb-4 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm your new password"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r cursor-pointer from-blue-400 to-fuchsia-500 hover:from-blue-500 hover:to-pink-500 text-white rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="text-blue-500 underline hover:text-blue-400"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
