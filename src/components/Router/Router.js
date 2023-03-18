import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import HomePage from '../Pages/HomePage/HomePage.js';

const CustomRouter = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default CustomRouter;
