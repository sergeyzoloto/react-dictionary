import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom';

export default function Word({ word }) {
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
