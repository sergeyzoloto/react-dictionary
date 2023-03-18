import React from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import CollectionButton from './CollectionButton';

const Sidebar = () => {
  const context = useWordsContext();
  console.log(context.data.collections);
  return (
    <>
      <h3>Sidebar</h3>
      {context.data.collections.map((item) => (
        <div key={item.id}>
          <CollectionButton collection={item} />
        </div>
      ))}
    </>
  );
};

export default Sidebar;
