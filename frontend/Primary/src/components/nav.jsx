import React from "react";
import Logo from "./logo";
import { Link,useNavigate } from "react-router-dom";
import Button1 from "./button1";
import SearchBar from "./searchbar";
import { useAuth } from "../Authcontext";
import { UserCircle } from "lucide-react";

export default function NavbarWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  }


  return (
    <div className="sticky top-0 w-full z-50 bg-gray-300 backdrop-blur-lg shadow-md py-2 px-6">
      <div className="flex flex-row justify-between items-center">
        <Link to="/">
        <Logo className1="text-[1.2vw]" className2="text-[2vw]" />
        </Link>
        <div className="flex flex-row gap-6">
          <Link
            to="/about"
            className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </Link>
          <Link
            to="/books"
            className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Books
          </Link>
          <Link
            to="/blogs"
            className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Blogs
          </Link>
          <Link
            to="/categories"
            className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Categories
          </Link>
        </div>
        <div className="flex flex-row gap-4">
         <SearchBar/>
         {user && localStorage.getItem('token') ? (
            <div onClick={handleClick} className="flex items-center gap-3 cursor-pointer">
              <UserCircle  className="w-8 h-8 text-gray-800" />
              <span className="text-md text-gray-800">{user.username}</span>
            
            </div>
          ) : (
            <Button1 link="/login" content="Log in" />
          )}
        </div>
      </div>
    </div>
  );
}
