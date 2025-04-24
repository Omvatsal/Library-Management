import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" font-poppins bg-black h-auto min-h-[40vh]  relative w-full">
    <div className="grid md:grid-cols-[30%_70%] grid-cols-1 justify-center items-center gap-4  text-white  p-4 ">
     <Logo className1="md:text-[2.5vw] align-middle text-5xl my-4 mx-auto" className2="align-middle text-6xl md:text-[5vw]"/>
     <div className="flex flex-row justify-around items-start">
      <div className="cursor-pointer mr-8 text-[2vw] md:text-lg text-white/80">
        <Link to='/books' className=" block  mt-8 pb-2">Browse Books</Link>
        <Link to='/dashboard' className="block  pb-2">Manage account</Link>
        <Link to='/dashboard#Library' className="block pb-2">My Library</Link>
        <Link to='/about#FAQ' className=" pb-2">FAQs</Link>
      </div>
      <div className="cursor-pointer ml-8 text-[2vw] md:text-lg text-white/80">
      <a href="tel:+9198667867" className="block mt-8 pb-2">Contact Us?</a>
      <a href='mailto:Bookshelf@gmail.com?subject=Feedback%20on%20Website&body=Please%20share%20your%20feedback%20here...' className="block pb-2">Feedback</a>
      </div>
      </div>
      </div>
    <div className="hidden md:flex text-xs absolute z-50 top-72.5  flex-row justify-between px-8 w-full text-[1.5vw] md:text-xs bg-black/85 text-white/60 text-center cursor-pointer py-3">
    <span className="pr-28">© 2025 All rights reserved.</span>
    <div className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-400 hover:after:w-full after:rounded-full">
    {/* <span className="inline-block px-2 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full">
    Website Terms
    </span>
    <span className="inline-block px-2 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full">
      Privacy Policy
    </span> */}
    Whispers of wonder, bound in digital ink
    </div>
    </div>
    </div>
  );
}
