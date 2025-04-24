import React from "react";

export default function Card({
  link = "",
  title,
  author = "",
  genre = "",
  pages = "",
  className = "",
  onReadMore = () => {},
}) {
  return (
    <div
      className={`mx-12 bg-white rounded-3xl shadow-md shadow-black/20 cursor-pointer hover:scale-95 transition-all w-[70%] mb-4 flex flex-row ${className}`}
    >
      <img src={link} alt={title} className="md:h-[15vh] md:w-[7vw] h-[10vh] w-[8vw] md:ml-12 ml-8 my-4" />
      <div className="flex flex-col ml-6">
        <div className="font-bold md:text-3xl text-xl mt-4 font-poppins">{title}</div>
        <div className="mt-4">
          <div className="text-xs text-gray-700 font-bold">
            AUTHOR:{" "}
            <span className="italic text-black text-xs font-normal">
              {author}
            </span>
          </div>
          <div className="text-xs text-gray-700 font-bold">
            GENRE:{" "}
            <span className="italic text-black text-xs font-normal">
              {genre}
            </span>
          </div>
          <div className="text-xs text-gray-700 mb-4 font-bold">
            PAGES:{" "}
            <span className="italic text-black text-xs font-normal">
              {pages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
