import './WordPage.css';
import React from 'react';
import { useParams } from 'react-router';
import { useWordsContext } from '../../../context/GlobalState';
import Sidebar from '../HomePage/Sidebar/Sidebar';

function WordPage() {
  const { id } = useParams();
  const context = useWordsContext();
  const { data } = context;
  const word = data.words.filter((word) => {
    return word.id.toString() === id;
  })[0];

  const collections = data.collections;

  return (
    <>
      <Sidebar />
      <h3>{word.word}</h3>
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

  function handleClick(event) {
    event.preventDefault();
    if (contains) {
      removeWordFromCollection(id, event.target.value);
    } else {
      addWordToCollection(id, event.target.value);
    }
  }

  return (
    <button
      className={
        contains ? 'collection-item-includes' : 'collection-item-exclude'
      }
      onClick={handleClick}
      value={collection.id}
    >
      {collection.title}
    </button>
  );
}
export default WordPage;
