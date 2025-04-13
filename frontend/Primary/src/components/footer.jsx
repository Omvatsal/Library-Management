import React from "react";
import Logo from "./logo";

export default function Footer() {
  return (
    <div className=" font-poppins bg-black h-auto min-h-[40vh] relative w-full">
    <div className="grid grid-cols-3  justify-start  text-white  p-4 ">
     <Logo className1="text-[2.5vw] p-8" className2="align-middle  text-[5vw]"/>
      <div className="cursor-pointer text-white/80">
        <div className=" mt-8 pb-2">Browse Books</div>
        <div className="pb-2">Manage account</div>
        <div className="pb-2">Help</div>
        <div className="pb-2">FAQs</div>
      </div>
      <div className="cursor-pointer  text-white/80">
      <div className="mt-8 pb-2">Contact Us?</div>
      <div className="pb-2">Feedback</div>
      </div>
      </div>
    <div className="text-xs absolute top-72 flex flex-row justify-between px-8 w-full bg-black/85 text-white/60 text-center cursor-pointer py-3">
    <span className="pr-28">© 2025 All rights reserved.</span>
    <div>
    <span className="inline-block px-2 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full">
    Website Terms
    </span>
    <span className="inline-block px-2 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full">
      Privacy Policy
    </span>
    </div>
    </div>
    </div>
  );
}
