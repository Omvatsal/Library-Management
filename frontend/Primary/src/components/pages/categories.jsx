import React from "react";
import Footer from "../footer";
import Card from "../card";
import { useAuth } from "../../Authcontext";
import NavbarWrapper from "../nav";

export default function Categories() {
  
   const {user}=useAuth();
   console.log(user)
   const card=[
      {
         link:"horror.jpg",
         title: "Horror",
         content: "Step into tales that blur reality and nightmare, weaving dread, dark secrets, and creeping terror. Brace yourself for haunting encounters, twisted minds, and horrors that linger long after the final page."
       },
       {
         link:"fantasy.jpg",
         title: "Fantasy",
         content: "Journey through realms where magic breathes life, mythical creatures roam, and heroes rise against ancient evils. Expect epic quests, enchanted worlds, and destinies forged in fire and wonder."
       },
       {
         link:"scifi.jpg",
         title: "Science Fiction",
         content: "Explore futures imagined and alternate realities shaped by technology, space, and time. From AI rebellions to distant galaxies, these stories spark awe, provoke thought, and question what it means to be human."
       },
       {
         link:"mystery.jpg",
         title: "Mystery",
         content: "Uncover secrets buried deep in puzzles, crimes, and clues. With every twist and red herring, tension builds until the final reveal turns everything upside down."
       },
       {
         link:"download.jpg",
         title: "Romance",
         content: "Fall into stories of passion, heartbreak, and emotional connection. From slow burns to love at first sight, these tales explore relationships that make hearts soar—or shatter."
       },
       {
         link:"adventure.jpg",
         title: "Adventure",
         content: "Embark on exhilarating journeys across untamed landscapes and unknown worlds. Filled with danger, discovery, and daring heroes, these stories promise action at every turn."
       },
       {
         link:"comedy.jpg",
         title: "Comedy",
         content: "Laugh through tales of wit, chaos, and clever mishaps. Whether light-hearted or biting, comedy finds the absurd in everyday life and spins it into pure entertainment."
       },
       {
         link:"crime.jpg",
         title: "Crime",
         content: "Enter a world of lawbreakers, detectives, and moral grey areas. From gritty investigations to chilling criminal minds, crime fiction dissects justice, motive, and consequence."
       },
       {
         link:"paranormal.jpg",
         title: "Paranormal",
         content: "Encounter ghosts, spirits, and forces beyond understanding. Paranormal stories blur the lines between reality and the supernatural, delivering thrills with a touch of the otherworldly."
       }
   ]
   
  return (
    <div className="w-full h-auto bg-white/80">
     <NavbarWrapper/>
     <div className="text-center text-5xl font-poppins my-12">Find stories you love.</div>
     <div className="text-center">Explore genres from mystery to fantasy, romance to horror—there’s something for everyone.</div> 
      <div className="p-8 m-8 flex flex-row flex-wrap gap-10">
        {card.map(({ link,title, content }, index) => (
          <Card
            key={index}
            link={link} 
            title={title}
            content={content}
            
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
