import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState.js';

const CollectionButton = ({ collection }) => {
  const context = useWordsContext();
  const { deleteCollection, updateCollection } = context;

  const [isEditing, setIsEditing] = useState(false);
  let collectionContent;

  if (isEditing) {
    collectionContent = (
      <>
        <label>
          <input
            type="text"
            value={collection.title}
            onChange={(event) => {
              updateCollection({ ...collection, title: event.target.value });
            }}
          />
        </label>
        <button onClick={() => setIsEditing(false)} className="save-btn">
          &#9745;
        </button>
      </>
    );
  } else {
    collectionContent = (
      <>
        {collection.title}
        <button
          className="edit-btn"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          /
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteCollection(collection.id)}
        >
          &#9747;
        </button>
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
        <div className="buttons-container">{collectionContent}</div>
      </label>
    </>
  );
};

export default CollectionButton;
