import React from "react";
import Home from "./components/pages/home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import SignUp from "./components/signin.jsx";
import Categories from "./components/pages/categories.jsx";
import Profile from "./components/pages/profile.jsx";

export default function App(){
    return(
       <Router>
        <Routes >
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<SignUp/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/dashboard" element={<Profile/>}/>
        </Routes>
       </Router>
    )
}