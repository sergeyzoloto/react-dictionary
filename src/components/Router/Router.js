import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import HomePage from '../Pages/HomePage/HomePage.js';
import WordPage from '../Pages/WordPage/WordPage.js';

const CustomRouter = () => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<WordPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default CustomRouter;
