import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordsContext } from '../../../context/GlobalState';
import { v4 } from 'uuid';
import './AddNewWord.css';

const AddNewWord = () => {
  const [text, setText] = useState('');
  const context = useWordsContext();
  const { addWord } = context;
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const newWord = { id: v4(), word: text };
    addWord(newWord);
    navigate(`/${newWord.id}`);
  }

  return (
    <div className="new-word-page">
      <h3>New word</h3>
      <form onSubmit={onSubmit} className="form-container">
        <div className="form-control">
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            placeholder="at the beginning was the word"
          ></input>
        </div>
        <button>+</button>
      </form>
    </div>
  );
};

export default AddNewWord;
