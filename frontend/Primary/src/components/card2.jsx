import React from "react";

export default function Card({
  link = "",
  title,
  className = "",
  onReadMore = () => {},
}) {
  return (
    <div
      className={`mx-4 bg-white rounded-3xl shadow-md shadow-black/20 cursor-pointer hover:scale-95 transition-all w-full mb-4 flex flex-row ${className}`}
    >
      <img src={link} alt={title} className="md:h-[10vh] md:w-[4vw] h-[7vh] w-[4vw] ml-12 my-4" />
      <div className="flex flex-col ml-6">
        <div className="font-semibold text-2xl mt-4 font-poppins">{title}</div>
        </div>
      </div>
  );
}
