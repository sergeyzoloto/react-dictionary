import React, { useState, useEffect } from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import { removeDuplicates } from '../../../../utils/removeDuplicates';
import { Link } from 'react-router-dom';

const Collection = () => {
  const context = useWordsContext();
  const { data, getCollections } = context;

  const [selectedWords, setSelectedWords] = useState(data.words);

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedCollections = data.collections.filter((item) => {
      return item.isActive === true;
    });
    const selectedWordsArrays = selectedCollections.map((item) => {
      return item.words;
    });

    let selectedWordsIndexes = [];
    selectedWordsArrays.forEach((words) => {
      words.forEach((item) => {
        selectedWordsIndexes.push(item);
      });
    });

    const selectedUniqueIndexes = removeDuplicates(selectedWordsIndexes);

    const result = data.words.filter((item) => {
      return selectedUniqueIndexes.includes(item.id);
    });

    if (result.length === 0 && selectedCollections.length === 0) {
      setSelectedWords(data.words);
    } else {
      setSelectedWords(result);
    }
  }, [data]);

  return (
    <>
      <div className="collection-list">
        {selectedWords.map((word) => {
          return <Word word={word} key={word.id} />;
        })}
      </div>
    </>
  );
};

function Word({ word }) {
  const context = useWordsContext();
  const { deleteWord, updateWord } = context;

  const [isEditing, setIsEditing] = useState(false);

  let wordContent;

  if (isEditing) {
    wordContent = (
      <>
        <label>
          <input
            type="text"
            value={word.word}
            onChange={(event) => {
              updateWord({ ...word, word: event.target.value });
            }}
          />
        </label>
        <button className="save-btn" onClick={() => setIsEditing(false)}>
          &#9745;
        </button>
      </>
    );
  } else {
    wordContent = (
      <>
        <Link className="wide" to={'/' + word.id}>
          <p>
            {word.word} {word.customField}
          </p>
        </Link>
        <button
          className="edit-btn"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          /
        </button>
        <button className="delete-btn" onClick={() => deleteWord(word.id)}>
          &#9747;
        </button>
      </>
    );
  }

  return (
    <div className="word-container">
      <div className="word-wrapper">
        <div className="buttons-container">{wordContent}</div>
      </div>
    </div>
  );
}

export default Collection;
