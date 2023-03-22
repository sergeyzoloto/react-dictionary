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
        <input
          value={word.word}
          onChange={(event) => {
            updateWord({ ...word, word: event.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    wordContent = (
      <>
        <Link to={'/' + word.id}>{word.word}</Link>
        <label>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            rename
          </button>
        </label>
      </>
    );
  }

  return (
    <div className="word-container">
      {wordContent}
      <label>
        <button onClick={() => deleteWord(word.id)}>delete</button>
      </label>
    </div>
  );
}
