import React from "react";

export default  function Logo({className1="",className2=""}){
    return(
        <div className={` font-bold  tracking-wider ${className1}`}>BOOK<span className={` font-dance rotate-4 inline-block font-medium ${className2}`}>S</span>HELF</div>
    );
}