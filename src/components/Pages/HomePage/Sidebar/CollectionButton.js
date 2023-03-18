import React, { useState } from 'react';
import { useWordsContext } from '../../../../context/GlobalState.js';

const CollectionButton = ({ collection }) => {
  const context = useWordsContext();
  const { deleteCollection, updateCollection } = context;

  const [isEditing, setIsEditing] = useState(false);
  let collectionContent;

  if (isEditing) {
    collectionContent = (
      <>
        <input
          value={collection.title}
          onChange={(event) => {
            updateCollection({ ...collection, title: event.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    collectionContent = (
      <>
        {collection.title}
        <label>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </label>
      </>
    );
  }

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
      <label
        className={
          collection.isActive
            ? 'collection-item-active'
            : 'collection-item-inactive'
        }
      >
        <button
          className="hidden-btn"
          onClick={clickHandler}
          value={collection.id}
        ></button>
        {collectionContent}
        <button onClick={() => deleteCollection(collection.id)}>delete</button>
      </label>
    </>
  );
};

export default CollectionButton;
