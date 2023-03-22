import React, { useEffect } from 'react';
import Collection from './Collection/Collection.js';
import Sidebar from '../../Sidebar/Sidebar.js';
import './HomePage.css';
import { useWordsContext } from '../../../context/GlobalState.js';

const HomePage = () => {
  const context = useWordsContext();
  const { getCollections } = context;

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Sidebar />
      <div className="home-page">
        <h3>HomePage</h3>
        <Collection />
      </div>
    </>
  );
};

export default HomePage;
