import './WordPage.css';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useWordsContext } from '../../../context/GlobalState.js';
import Sidebar from '../../Sidebar/Sidebar';
import CollectionList from '../../CollectionList/CollectionList.js';
import CustomField from '../../CustomField/CustomField';

function WordPage() {
  const { id } = useParams();
  const context = useWordsContext();
  const { data, getCollections, getDefinition } = context;

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="word-page">
        <h2>word: {word.word}</h2>
        <h3>translate:</h3>
        <CustomField word={word} />
        <div className="collection-list">
          <CollectionList wordId={word.id} collections={collections} />
        </div>
        <Details dictionary={word.dictionary} />
        <div className="get-btn-container">
          <button className="get-btn" onClick={clickHandler}>
            GET
          </button>
        </div>
      </div>
    </>
  );
}

function Audio({ audio = null }) {
  if (audio !== null && audio !== '') {
    return (
      <div>
        <p>audio:</p>
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
    <div className="phonetic-element">
      <Audio audio={phonetic.audio} />
      <Phoneme text={phonetic.text} />
    </div>
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
      <div className="definition-element">
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
    <div className="meaning-element">
      <PartOfSpeech partOfSpeech={meaning.partOfSpeech} />
      <Definitions definitions={meaning.definitions} />
    </div>
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
        <li className="source-element" key={index}>
          <a target="_blank" rel="noreferrer" href={item}>
            {item}
          </a>
        </li>
      );
    });
  } else {
    return <p>source URLs not found</p>;
  }
}

function Details({ dictionary = null }) {
  const context = useWordsContext();
  const { error, loading } = context;

  if (error)
    return (
      <div>
        <h3>{error.title}</h3>
        <p>{error.message}</p>
        <p>{error.resolution}</p>
      </div>
    );

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

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
          <ul>
            <SourceUrls sourceUrls={dictionary.sourceUrls} />
          </ul>
        </div>
      </>
    );
  } else {
    return <p>No details found</p>;
  }
}

export default WordPage;
