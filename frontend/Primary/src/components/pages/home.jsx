import React from "react";
import Footer from "../footer";
import NavbarWrapper from "../nav";
import Main from "../main";
 
export default function Home(){
    return(
        <div className="w-screen h-screen overflow-y-visible hide-scrollbar scroll-smooth overflow-x-hidden bg-black/25">
        <NavbarWrapper/>
        <Main/>
        <Footer/>
        </div>
    );
}