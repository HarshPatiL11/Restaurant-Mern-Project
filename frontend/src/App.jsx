import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Layout from './Components/Layouts/Layout'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Contact from './Components/Pages/Contact'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/about"  element={<About/>}/>
          <Route  path="/contact" element={<Contact/>}/>
         {/* <Route path='/menu' element={<Menu/>}/>  */}
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App
