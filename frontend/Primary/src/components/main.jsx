import React from "react";
import book3 from "../assets/book3.png";
import Button2 from "./button2";
import "../index.css";
import Author from "./auuthor";
import { useAuth } from "../Authcontext";

export default function Main() {
  const { user } = useAuth();

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
          className="md:relative w-full aspect-square overflow-visible"
        >
          {isImageCell && (
            <img
              src={images[row-1]}
              alt={`img-${row}-${col}`}
              className="h-[120px] w-auto md:scale-200 scale-150 transition-transform duration-300
            md:absolute md:top-40 md:left-1/2 md:-translate-x-1/2 md:translate-y-[-60%] "
            />
          )}
        </div>
      );
    }
  }

  return (
    <main className="relative w-full hide-scrollbar bg-gray-300">
      <div className=" md:grid grid-cols-2 w-full px-10 h-screen gap-4">
        <div className="flex flex-col align-middle pl-8 justify-start pt-12 md:pt-24">
          <h1 className="text-[4rem] font-extrabold font-poppins mb-4">
            Stories that <br /> stay with you.
          </h1>
          <p className="text-[1rem] mb-8 text-black font-serif">
            Step into countless worlds,
            <br /> all from the comfort of your screen.
            <br />
            Discover stories that let you live more than just one life.
          </p>

          <Button2
            link={user ? "/books" : "/login"}
            content="Explore Now"
            classname="md:w-[12vw] w-[40vw]"
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

        <div className=" md:overflow-x-hidden md:overflow-y-hidden md:pt-20 ">
          <div
            className="hidden md:grid grid-cols-3 grid-rows-3 "
            style={{ width: "100%", maxWidth: "100rem", height: "50%" }}
          >
            {gridItems}
          </div>
        </div>
      </div>
      
      <div className="relative md:flex flex-row -mt-8 h-fit gap-12">
        <img
          className="absolute h-[110px] -rotate-30 left-32 top-6 md:top-2"
          src="./imgb.png"
        />
        <img src={book3} alt="best seller" className="h-[50vh] " />
        <div className="md:flex flex-col px-4 pt-4">
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
        <div className="font-extrabold font-poppins mt-16 mx-auto text-4xl pl-8 md:m-6">
          Author's Section
        </div>
        <Author/>
    </main>
  );
}
