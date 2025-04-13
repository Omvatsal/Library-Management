import React from "react";
import book3 from "../assets/book3.png";
import Button2 from "./button2";
import "../index.css";
import Author from "./auuthor";

export default function Main() {
  const images = [
    "/book2.png",
  "/book2.jpg",
  "/book3.jpg"
  ];
  const gridItems = [];
  for (let row = 1; row <= 3; row++) {
    for (let col = 1; col <= 3; col++) {
      const isImageCell =
        (row === 1 && col === 1) ||
        (row === 2 && col === 2) ||
        (row === 3 && col === 3);

      gridItems.push(
        <div
          key={`${row}-${col}`}
          className="relative w-full aspect-square overflow-visible"
        >
          {isImageCell && (
            <img
              src={images[row-1]}
              alt={`img-${row}-${col}`}
              className="absolute top-40 left-1/2 -translate-x-1/2 translate-y-[-60%] h-[120px] w-auto scale-200  transition-transform duration-300 "
            />
          )}
        </div>
      );
    }
  }

  return (
    <main className="relative w-full">
      <div className=" grid grid-cols-2 w-full px-10 h-screen gap-4">
        <div className="flex flex-col align-middle pl-8 justify-start pt-24">
          <h1 className="text-[4em] font-extrabold font-poppins mb-4">
            Stories that <br /> stay with you.
          </h1>
          <p className="text-[1em] mb-8 text-black font-serif">
            Step into countless worlds,
            <br /> all from the comfort of your screen.
            <br />
            Discover stories that let you live more than just one life.
          </p>

          <Button2
            link="./login"
            content="Explore Now"
            classname="w-[12vw]"
            classname2="pr-4 after:content-['|_'] after:ml-2 after:inline-block"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-4 h-4 stroke-white fill-none"
                strokeWidth="10"
              >
                <path
                  d="M10 90 L90 10 M55 10 H90 V45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>

        <div className=" overflow-x-hidden overflow-y-hidden pt-20 ">
          {/* <div className="absolute top-100 left-80 text-[3vh] font-bold">Escape</div> */}
          <div className="absolute top-20 left-[80%]   text-[8vh] font-bold">
            Read
          </div>
          <div className="absolute top-40 text-[2vh] left-[80%] ">by millions</div>
          <div
            className="grid grid-cols-3 grid-rows-3 "
            style={{ width: "100%", maxWidth: "100rem", height: "50%" }}
          >
            {gridItems}
          </div>
        </div>
      </div>
      <div className="relative flex flex-row -mt-8 h-fit gap-12">
        <img
          className="absolute h-[110px] -rotate-30 left-32 top-2"
          src="./imgb.png"
        />
        <img src={book3} alt="best seller" className="h-[50vh] " />
        <div className="flex flex-col pt-4">
          <div className="font-extrabold text-[3vh] font-poppins pb-4">
            Curated from top charts,trending now.
          </div>
          <div>
            Dive into the pages of our most-loved book of the season.
            <br /> Don’t stop here — explore, experiment, and find the genre
            that speaks to you.
            <br /> Your next favorite story is just a page away.
          </div>
          <div className="font-bold mt-8 mb-4 text-2xl">Top sellers.</div>
          <ol>
          <li className="list-decimal list-inside">The Pyschology of money</li>
          <li className="list-decimal list-inside">Pride and prejudice</li>
          <li className="list-decimal list-inside" >Rich Dad,Poor Dad</li>
          </ol>
        </div>
      </div>
        <div className="font-extrabold font-poppins text-4xl pl-8 m-6">
          Author's Section
        </div>
        <Author/>
    </main>
  );
}
