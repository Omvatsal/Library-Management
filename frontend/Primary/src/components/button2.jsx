import React from "react";
import { Link } from "react-router-dom";

export default function Button2({ link, content,classname2="", classname = "", icon = null }) {
  return (
    <Link
      to={link}
      className={`bg-black p-4 text-white flex items-center gap-2 ${classname}`}
    >
      <span className={`${classname2}`}>{content}</span>
      {icon}
    </Link>
  );
}
