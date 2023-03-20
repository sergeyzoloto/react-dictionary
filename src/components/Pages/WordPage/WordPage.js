import './WordPage.css';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useWordsContext } from '../../../context/GlobalState.js';
import Sidebar from '../../Sidebar/Sidebar';

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

  return (
    <>
      <Sidebar />
      <h3>{word.word}</h3>
      <Details dictionary={word.dictionary} />
      <div>
        <button onClick={clickHandler}>GET</button>
      </div>
      <div>
        <CollectionList collections={collections} />
      </div>
    </>
  );
}

function Audio({ audio = null }) {
  if (audio !== null && audio !== '') {
    return (
      <div>
        audio:{' '}
        <audio controls>
          <source src={audio} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  } else {
    return;
  }
}

function Phoneme({ text = null }) {
  if (text !== null && text !== '') {
    return <p>phoneme: {text}</p>;
  } else {
    return;
  }
}

function PhoneticElement({ phonetic = null }) {
  return (
    <>
      <Audio audio={phonetic.audio} />
      <Phoneme text={phonetic.text} />
    </>
  );
}

function Phonetics({ phonetics = [] }) {
  if (phonetics !== null && phonetics.length !== 0) {
    return phonetics.map((item, index) => {
      return <PhoneticElement phonetic={item} key={index} />;
    });
  } else {
    return <div>phonetics not found</div>;
  }
}

function PartOfSpeech({ partOfSpeech = null }) {
  if (partOfSpeech !== null && partOfSpeech !== '') {
    return <p>part of speech: {partOfSpeech}</p>;
  } else {
    return;
  }
}

function DefinitionString({ string = null }) {
  if (string !== null && string !== '') {
    return <p>definition: {string}</p>;
  } else {
    return;
  }
}

function Synonyms({ synonyms = [] }) {
  if (synonyms !== null && synonyms.length !== 0) {
    return synonyms.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  } else {
    return;
  }
}

function Antonyms({ antonyms = [] }) {
  if (antonyms !== null && antonyms.length !== 0) {
    return antonyms.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  } else {
    return;
  }
}

function Example({ example = null }) {
  if (example !== null && example !== '') {
    return <p>example: {example}</p>;
  } else {
    return;
  }
}

function DefinitionElement({ definition = null }) {
  if (definition !== null && definition !== '') {
    return (
      <div>
        <DefinitionString string={definition.definition} />
        <Synonyms synonyms={definition.synonyms} />
        <Antonyms antonyms={definition.antonyms} />
        <Example example={definition.example} />
      </div>
    );
  }
  return <></>;
}

function Definitions({ definitions = [] }) {
  if (definitions !== null && definitions.length !== 0) {
    return definitions.map((item, index) => {
      return <DefinitionElement definition={item} key={index} />;
    });
  } else {
    return <div>definitions not found</div>;
  }
}

function MeaningElement({ meaning = null }) {
  return (
    <>
      <PartOfSpeech partOfSpeech={meaning.partOfSpeech} />
      <Definitions definitions={meaning.definitions} />
    </>
  );
}

function Meanings({ meanings = [] }) {
  if (meanings !== null && meanings.length !== 0) {
    return meanings.map((item, index) => {
      return <MeaningElement meaning={item} key={index} />;
    });
  } else {
    return <div>definitions not found</div>;
  }
}

function SourceUrls({ sourceUrls = [] }) {
  if (sourceUrls !== null && sourceUrls.length !== 0) {
    return sourceUrls.map((item, index) => {
      return (
        <li key={index}>
          {index + 1}: <a href={item}>{item}</a>
        </li>
      );
    });
  } else {
    return <p>source URLs not found</p>;
  }
}

function Details({ dictionary = [] }) {
  if (dictionary !== null && dictionary.length !== 0) {
    return (
      <>
        <div>
          <h3>phonetics</h3>
          <Phonetics phonetics={dictionary.phonetics} />
        </div>
        <div>
          <h3>meanings</h3>
          <Meanings meanings={dictionary.meanings} />
        </div>
        <div>
          <h3>sources</h3>
          <SourceUrls sourceUrls={dictionary.sourceUrls} />
        </div>
      </>
    );
  } else {
    return <p>No details found</p>;
  }
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
