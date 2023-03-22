import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';

function CollectionList({ wordId, collections }) {
  if (collections !== null && collections.length !== 0) {
    return (
      <>
        <h3>add to collections</h3>
        <div className="collections-container">
          {collections.map((collection) => {
            return (
              <Collection
                key={collection.id}
                wordId={wordId}
                collection={collection}
                contains={collection.words.includes(wordId)}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return;
  }
}

function Collection({ wordId, collection, contains }) {
  const context = useWordsContext();
  const { addWordToCollection, removeWordFromCollection } = context;
  const [includes, setIncludes] = useState(contains);

  function handleClick(event) {
    event.preventDefault();
    if (includes) {
      removeWordFromCollection(wordId, event.target.value);
      setIncludes(false);
    } else {
      addWordToCollection(wordId, event.target.value);
      setIncludes(true);
    }
  }

  return (
    <button
      className={
        includes ? 'collection-item-includes' : 'collection-item-excludes'
      }
      onClick={handleClick}
      value={collection.id}
    >
      {collection.title}
    </button>
  );
}
export default CollectionList;
