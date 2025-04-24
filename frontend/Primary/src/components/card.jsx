import React from "react";

export default function Card({ link, title = "", content = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col max-h-[60vh] max-w-[20vw] min-w-48 rounded-4xl cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105 bg-white shadow-md shadow-black/40"
    >
      <div className="w-full h-0 group-hover:h-[160px] transition-all duration-500 overflow-hidden">
        <img
          src={link}
          alt={title}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text Section */}
      <div className="p-4 transition-all duration-300">
        <h2 className="text-xl font-poppins font-extrabold mb-1 text-black">
          {title}
        </h2>
        <p className="text-xs leading-snug overflow-y-auto min-w-20 max-h-48 text-black">{content}</p>
      </div>
    </div>
  );
}
