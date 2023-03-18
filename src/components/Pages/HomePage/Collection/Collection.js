import React, { useState, useEffect } from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import { removeDuplicates } from '../../../../utils/removeDuplicates';

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

    setSelectedWords(result);
  }, [data]);

  return (
    <>
      <div className="collection-list">
        <h3>Selected collection</h3>
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
        <input
          value={word.word}
          onChange={(event) => {
            updateWord({ id: word.id, word: event.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    wordContent = (
      <>
        <div>{word.word}</div>
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

  return (
    <div className="word-container">
      <label>
        <button
          onClick={() => {
            console.log('open adding to a collection');
          }}
        >
          Add
        </button>
      </label>

      {wordContent}

      <label>
        <button onClick={() => deleteWord(word.id)}>delete</button>
      </label>
    </div>
  );
}

export default Collection;
