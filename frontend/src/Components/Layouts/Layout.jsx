import React from 'react'
import Navbar from '../Pages/Navbar'
import Footer from './Footer';
import AdminPanel from '../Pages/AdminPanel';
import RestRA from '../Pages/RestrauntRA';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout