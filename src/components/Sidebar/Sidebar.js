import React from 'react';
import CollectionButton from './CollectionButton';
import AddNewCollection from './AddNewCollection';
import { useWordsContext } from '../../context/GlobalState.js';

const Sidebar = () => {
  const context = useWordsContext();
  const { sideBarIsOpen } = context;
  return (
    <div id="side-bar" className={sideBarIsOpen ? 'side-bar open' : 'side-bar'}>
      <h3>Sidebar</h3>
      {context.data.collections.map((item) => (
        <div className="collection-item" key={item.id}>
          <CollectionButton collection={item} />
        </div>
      ))}
      <AddNewCollection />
    </div>
  );
};

export default Sidebar;
