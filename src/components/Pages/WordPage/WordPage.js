import './WordPage.css';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useWordsContext } from '../../../context/GlobalState.js';

function WordPage() {
  const { id } = useParams();
  const context = useWordsContext();
  const { data, getDefinition } = context;
  const word = data.words.filter((word) => {
    return word.id.toString() === id;
  })[0];

  const collections = data.collections;

  function clickHandler() {
    getDefinition(word.word);
  }

  const details = { ...word };

  for (const property in details) {
    console.log(`property: ${property} details[property]:${details[property]}`);
  }

  return (
    <>
      <h3>{word.word}</h3>
      <div>
        <h4>source URLs</h4>
        {word.dictionary.sourceUrls.map((url) => {
          return <p>{url}</p>;
        })}
      </div>
      <button onClick={clickHandler}>GET</button>
      <CollectionList collections={collections} />
    </>
  );
}

function CollectionList({ collections }) {
  const { id } = useParams();

  return collections.map((collection) => {
    return (
      <Collection
        key={collection.id}
        collection={collection}
        contains={collection.words.includes(id)}
      />
    );
  });
}

function Collection({ collection, contains }) {
  const { id } = useParams();
  const context = useWordsContext();
  const { addWordToCollection, removeWordFromCollection } = context;
  const [includes, setIncludes] = useState(contains);

  function handleClick(event) {
    event.preventDefault();
    if (includes) {
      removeWordFromCollection(id, event.target.value);
      setIncludes(false);
    } else {
      addWordToCollection(id, event.target.value);
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
export default WordPage;
