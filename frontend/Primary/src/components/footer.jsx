import React from "react";

export default function Footer() {
  return (
    <div className=" bg-black font-poppins h-auto w-full p-4 ">
    <div className="grid grid-cols-3  justify-start  text-white ">
      <div className="text-3xl  ml-10 font-bold  tracking-wider">BOOK<span className="text-8xl font-dance rotate-4 inline-block translate-y-4 font-medium">S</span>HELF</div>
      <div className="cursor-pointer text-white/80">
        <div className=" mt-4 pb-1">Browse Books</div>
        <div className="pb-1">Manage account</div>
        <div className="pb-1">Help</div>
        <div className="pb-1">FAQs</div>
      </div>
      <div className="cursor-pointer  text-white/80">
      <div className="mt-4 pb-1">Contact Us?</div>
      <div className="pb-1">Feedback</div>
      </div>
      </div>
    <div className="text-xs text-white/40 text-center cursor-pointer pt-6">
    <span className="inline-block relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full">
    Terms & conditions
    </span>
    <div className="mt-1">© 2025 All rights reserved.</div>
    </div>
    </div>
  );
}
