import React, { useEffect, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";

export default function Profile() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const handleClick2 = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data.users); 
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!localStorage.getItem("token")) {
    return <RedirectToHome />;
  }

  return (
    <div className="w-full h-auto bg-gray-300">
      <div className="grid grid-cols-2 gap-8 p-8">
        <div className="flex flex-col  bg-gray-300">
          <div className="flex flex-row items-center gap-4">
            <PiUserCircleThin className="w-40 h-40 opacity-80  rounded-4xl" />
              <div>
                <div className="text-3xl font-poppins font-bold">Hi, {user?.firstName}</div>
                <div className="text-black/50">{user?.email}</div>
              </div>
          </div>
          <div className="text-black mt-8 p-8 shadow-md rounded-4xl bg-white">
            <div className="text-2xl font-poppins font-bold ">Books Rented</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-end gap-4">
            <div className="bg-white hover:bg-gray-200 shadow-md text-semibold border cursor-pointer rounded-2xl py-2 px-4 border-black">Change Profile</div>
            <div onClick={handleClick2} className="bg-red-600 hover:bg-red-700 shadow-md text-white cursor-pointer text-semibold border rounded-2xl py-2 px-4 border-black">Log Out</div>
          </div>
          <div className="p-6 bg-white rounded-4xl shadow-md">
          <div className="font-bold text-2xl font-poppins">Your following</div>
          </div>
          <div className="p-6 bg-white rounded-4xl shadow-md">Want to publish your Own book</div>
        </div>
      </div>
      <Footer/>
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
