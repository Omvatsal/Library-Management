import React, { useState, useRef, useEffect } from "react";
import Logo from "./logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button1 from "./button1";
import SearchBar from "./searchbar";
import { useAuth } from "../Authcontext";
import { UserCircle, Menu, Search } from "lucide-react";

export default function NavbarWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const cachedImage = localStorage.getItem("profileImage");
    if (cachedImage) {
      setProfileImage(cachedImage);
    }
  }, []);

  const handleClick = () => navigate("/dashboard");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState("0px");
  const [searchHeight, setSearchHeight] = useState("0px");

  useEffect(() => {
    if (isMenuOpen) {
      setMenuHeight(`${menuRef.current.scrollHeight}px`);
    } else {
      setMenuHeight("0px");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (showSearch) {
      setSearchHeight(`${searchRef.current.scrollHeight}px`);
    } else {
      setSearchHeight("0px");
    }
  }, [showSearch]);

  
  const Avatar = ({ className = "w-8 h-8" }) => {
    return profileImage ? (
      <img 
        src={profileImage} 
        alt="Profile" 
        className={`${className} rounded-full object-cover`}
      />
    ) : (
      <UserCircle className={`${className} text-gray-800`} />
    );
  };

  return (
    <div className="sticky top-0 w-full z-50 bg-gray-400 backdrop-blur-lg shadow-md py-2 px-6">
      <div className="flex flex-row justify-between items-center md:min-h-16 min-h-10">
        <Link to="/">
          <Logo
            className1="md:text-[2vw] text-[3vw]"
            className2="md:text-[2.8vw] text-[3.8vw]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row gap-6">
          {["about", "books", "blogs", "categories"].map((path) => {
            const isActive = location.pathname.startsWith(`/${path}`);
            return (
              <Link
                key={path}
                to={`/${path}`}
                className={`nav-link after:content-[''] after:block after:rounded-full after:h-[2px] after:bg-black/80 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive ? "after:w-full" : "after:w-0"
                }`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex flex-row gap-4 items-center">
          <SearchBar />
          {user && localStorage.getItem("token") ? (
            <div
              onClick={handleClick}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <Avatar />
              <span className="text-md text-gray-800">{user.username}</span>
            </div>
          ) : (
            <Button1 link="/login" content="Log in" />
          )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <Search className="w-6 h-6 cursor-pointer" onClick={toggleSearch} />
          <Menu className="w-7 h-7 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* Search - Mobile Dropdown */}
      <div
        ref={searchRef}
        className="md:hidden overflow-hidden transition-all duration-400 ease-in-out mt-2"
        style={{ maxHeight: searchHeight }}
      >
        <SearchBar />
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={menuRef}
        className="md:hidden overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: menuHeight }}
      >
        <div className="mt-4 flex flex-col gap-4">
          {["about", "books", "blogs", "categories"].map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              onClick={toggleMenu}
              className="mobile-link hover:text-red-500"
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          ))}
          {user && localStorage.getItem("token") ? (
            <div
              onClick={() => {
                toggleMenu();
                handleClick();
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Avatar className="w-7 h-7" />
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