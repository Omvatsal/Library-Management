import React from "react";
import NavbarWrapper from "../nav";
import Footer from "../footer";
import FAQItem from "../Faq.jsx"; 

const faqData = [
  {
    question: "1. How do I rent an ebook from Bookshelf?",
    answer:
      'You can rent any ebook by creating an account and browsing our catalog. Once you find a book you like, click on the "Rent" button and follow the checkout steps.',
  },
  {
    question: "2. Can I read ebooks offline after purchase?",
    answer:
      "Yes, after purchasing, you can download the ebook in PDF or EPUB format and access it anytime offline.",
  },
  {
    question: "3. Is there a subscription model for unlimited reading?",
    answer:
      "Not yet, but we are working on a subscription model that will allow unlimited access to our entire library for a monthly fee. Stay tuned for updates!",
  },
  {
    question: "4. Can I publish my own book on Bookshelf?",
    answer:
      "Absolutely! You can sign up as an author and submit your manuscript for review. Once approved, your book will be listed for readers worldwide.",
  },
  {
    question: "5. What devices are supported for reading?",
    answer:
      "Bookshelf is accessible via web browsers on desktops, laptops, tablets, and smartphones. We also support Kindle and other eReaders with compatible formats.",
  },
];


export default function Aboutus() {
  return (
    <div className="h-auto w-full">
      <NavbarWrapper />
      <div className="bg-gray-300 h-auto px-10 py-12">
        <div className="container relative z-20 bg-gray-400 md:w-7xl  md:h-10/12 flex flex-col rounded-br-full">
          <div className="container my-5 mx-7 w-8/12 h-auto px-4 rounded-b-lg">
            <p className="text-4xl font-roman">
                Your Reading Journey Starts Here.
              </p>
              <br />
              <p className="overflow-visible text-[2.5vh] leading-8">
                Welcome to <span className="font-semibold">Bookshelf</span> — a
                cozy digital haven for every book lover out there. Whether
                you're a curious beginner, a devoted bibliophile, or someone
                simply in search of your next great read, Bookshelf is designed
                just for you. 
                <br />
                <br />
                It’s more than just a platform — it’s your
                personal library, open 24/7, where you can explore, rent, and
                enjoy books like never before. Our mission is simple — to make
                books more accessible, enjoyable, and community-driven. With
                just a few clicks, you can rent your favorite titles and start
                reading instantly, without worrying about availability or
                location.
                <br />
                <br />
                Bookshelf makes it easy to stay connected with the stories you
                love. Our intuitive system lets you build your own virtual shelf
                of rented books, so you always know what you’ve read and what’s
                next on your list. 
                <br />
                <br />
                <span className="font-semibold text-bg-[#f0f0f0]">
                  Read more. Discover more. Enjoy more — with Bookshelf.
                </span>
            </p>
          </div>
          <div className="photos">
          <div className="book">
            <div className="cover "></div>
          </div>
          <div className="rock">
            <img src="/rock1.png" alt="rock graphic" />
          </div>
        </div>
        </div>

        {/* FAQ Section */}
        <div className="md:flex justify-center items-center md:mt-48">
          <img
            src="/FAQ.png"
            alt="FAQ graphic"
            className="md:w-1/2 w-full h-auto  rounded-full "
          />
        <div
          id="FAQ"
          className=" bg-gray-400 p-8 rounded-full shadow-lg w-full md:w-11/12 lg:w-5/12 ml-auto"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
