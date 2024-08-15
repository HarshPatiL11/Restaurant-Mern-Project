import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import LoginForm from "./Components/Pages/UserLogin";
import UserRegister from "./Components/Pages/UserRegister";
import RestById from "./Components/Pages/RestById"; 
import UserProfile from "./Components/Pages/Profile";
import UserUpdate from "./Components/Pages/UserUpdate";
import UpdatePassword from "./Components/Pages/UpdatePassword";
import FoodCard from "./Components/Pages/FoodCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/restaurant/:id" element={<RestById />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/update" element={<UserUpdate />} />
          <Route path="/user/changepassword" element={<UpdatePassword />} />
          <Route path="/menu" element={<FoodCard />} />
          {/* <Route path="/category/:catName" element={< />} /> */}
          {/* <Route path='/menu' element={<Menu/>}/>  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
