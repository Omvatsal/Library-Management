import React, { useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Author() {
  const [Count, setCount] = useState(0);
  const arr = [
    {
      name: "J.K. Rowling",
      desc: "She’s one of the most famous British novelists who is famous worldwide. She originally wrote the Harry Potter movie series you watch today. Joanne Rowling is her real name. However, she’s famous in the writing industry as J.K. Rowling. Rowling has been loved all over the world since her novel Harry Potter was translated into 70 plus languages and sold more than 500 million book copies.",
      link: "/J.K.-Rowling.jpg",
    },
    {
      name: "Stephen King",
      desc: "Stephen King is an American fiction writer. His books mostly belong to genres like horror, supernatural, and crime. Stephen King is now in his 70s and has spent his life writing best-selling books that are popular all over the world. People love reading his books. He is one of the top best-selling authors of all time. Not only has he written successful novels but also more than one hundred short stories.",
      link: "/Stephen-king.jpg",
    },
    {
      name: "John Green",
      desc: "If a movie is based on a novel, it’s a good novel. John Green is a young American author, now in his 40s, and has written the novel The Fault in Our Stars. Another bestseller novel. A movie is based on his novel too. Like his novel, the movie was also a hit and a huge box office success. Besides this, his novel Paper Town also got a movie on it.",
      link: "/John-Green.jpg",
    },
  ];
  const handleClick = () => {
    if (Count === arr.length - 1) {
      setCount(0);
    } else {
      setCount(Count + 1);
    }
  };
  return (
    <div className="md:grid grid-row-[95%,5%] mx-16 ">
      <AnimatePresence mode="wait">
        <motion.div
          key={arr[Count].name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="md:flex flex-row items-start gap-12 my-8 transition-all duration-300"
        >
          <img
            src={arr[Count].link}
            alt={arr[Count].name}
            className="md:h-[380px] h-[200px] w-auto md:w-[35%] mx-auto rounded-full md:rounded-4xl object-cover cursor-pointer hover:scale-95 transition-all duration-300 md:mx-8"
          />
          <div className="p-4 rounded-xl flex-1 ">
            <div className="text-2xl font-bold font-poppins tracking-wide">
              {arr[Count].name}
            </div>
            <div className="mt-2 md:max-w-[80%]">{arr[Count].desc}</div>
          </div>

          <HiArrowCircleRight
            className="w-12 h-12 mt-8 md:mr-4 mx-auto cursor-pointer text-gray-600 hover:text-black"
            onClick={handleClick}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
