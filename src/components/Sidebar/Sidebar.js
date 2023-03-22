import React from 'react';
import CollectionButton from './CollectionButton';
import AddNewCollection from './AddNewCollection';
import { useWordsContext } from '../../context/GlobalState.js';
import './Sidebar.css';

const Sidebar = () => {
  const context = useWordsContext();
  const { sideBarIsOpen } = context;
  return (
    <>
      {' '}
      <div className={sideBarIsOpen ? 'overlay shadow' : 'overlay'}></div>
      <div
        id="sidebar"
        className={sideBarIsOpen ? 'sidebar-open' : 'sidebar-hidden'}
      >
        <h3>Sidebar</h3>
        {context.data.collections.map((item) => (
          <div className="collection-item" key={item.id}>
            <CollectionButton collection={item} />
          </div>
        ))}
        <AddNewCollection />
      </div>
    </>
  );
};

export default Sidebar;
