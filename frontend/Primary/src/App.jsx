import React from "react";
import Home from "./components/pages/home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login.jsx";
import SignUp from "./components/pages/signin.jsx";
import Categories from "./components/pages/categories.jsx";
import Profile from "./components/pages/profile.jsx";
import Book from "./components/pages/books.jsx";
import BookId from "./components/pages/books_id.jsx";
import Aboutus from "./components/pages/Aboutus.jsx";
import ChangeProfile from "./components/pages/profilechange.jsx";
import ResetPassword from "./components/pages/passchange.jsx";
import ForgotPassword from "./components/pages/forchange.jsx";

export default function App(){
    return(
       <Router>
        <Routes >
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<SignUp/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/dashboard" element={<Profile/>}/>
            <Route path="/books" element={<Book/>}/>
            <Route path="/books/:id" element={<BookId/>}/>
            <Route path="/about" element={<Aboutus/>}/>
            <Route path="/profile/change" element={<ChangeProfile />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
       </Router>
    )
}