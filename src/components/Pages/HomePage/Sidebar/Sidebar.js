import React from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import CollectionButton from './CollectionButton';
import AddNewCollection from './AddNewCollection';

const Sidebar = () => {
  const context = useWordsContext();
  return (
    <div id="side-bar" className="side-bar">
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
