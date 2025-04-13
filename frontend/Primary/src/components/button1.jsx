import React from "react";
import { Link } from "react-router-dom";

export default function Button1({link,content}){
    return(
       <div className="border-2 border-black px-4 py-2 m-2">
        <Link to={link} className="text-black">{content}</Link>
       </div> 
    )
}