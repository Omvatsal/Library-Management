// import React from "react";
// import { Link } from "react-router-dom";

// export default function Button1({link,content}){
//     return(
//        <div className="border-2 border-black text-center px-4 py-2 m-2">
//         <Link to={link} className="text-black ">{content}</Link>
//        </div> 
//     )
// }

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Button1({ link, content }) {
  return (
    <div
      className="relative overflow-hidden border-2 border-black hover:bg-black  hover:rounded-3xl transition-all duration-300  text-center px-4 py-2 m-2 cursor-pointer group"
    >
      {/* Link Text */}
      <Link
        to={link}
        className="relative z-10 text-black  transition-colors duration-300 group-hover:text-white"
      >
        {content}
      </Link>
    </div>
  );
}

