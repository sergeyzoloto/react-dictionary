import React from 'react';
import { useWordsContext } from '../../../../context/GlobalState';

const CollectionButton = ({ collection }) => {
  const context = useWordsContext();
  const clickHandler = (event) => {
    event.preventDefault();
    if (collection.isActive) {
      context.deleteActiveCollection(event.target.value);
    } else {
      context.addActiveCollection(event.target.value);
    }
  };

  return (
    <>
      <button
        className={
          collection.isActive
            ? 'collection-item-active'
            : 'collection-item-inactive'
        }
        onClick={clickHandler}
        value={collection.id}
      >
        {collection.title}
      </button>
    </>
  );
};

export default CollectionButton;
