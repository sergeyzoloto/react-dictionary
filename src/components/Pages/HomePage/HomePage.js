import React from 'react';
import Collection from './Collection/Collection.js';
import Sidebar from './Sidebar/Sidebar.js';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <h3>HomePage</h3>
      <Collection />
      <Sidebar />
    </>
  );
};

export default HomePage;
